
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { StoreData } from '@/types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  storeData: StoreData | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, storeName: string, ownerName: string, planType: string, logo?: File | null) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Avoid Supabase deadlock by using setTimeout
          setTimeout(() => {
            fetchStoreData(session?.user?.id);
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setStoreData(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchStoreData(session.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const fetchStoreData = async (userId?: string) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) throw error;
      setStoreData(data);
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, storeName: string, ownerName: string, planType: string, logo?: File | null) => {
    try {
      setLoading(true);
      
      // 1. Create the user
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      
      if (authError) throw authError;
      if (!authData.user) throw new Error('Falha ao criar usuário');
      
      let logoUrl = null;
      
      // 2. Upload logo if provided
      if (logo) {
        const fileExt = logo.name.split('.').pop();
        const fileName = `${authData.user.id}-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('store_logos')
          .upload(fileName, logo);
        
        if (uploadError) throw uploadError;
        
        // 3. Get the public URL
        const { data: urlData } = supabase.storage
          .from('store_logos')
          .getPublicUrl(fileName);
          
        logoUrl = urlData.publicUrl;
      }
      
      // 4. Create store record
      const { error: storeError } = await supabase
        .from('stores')
        .insert({
          name: storeName,
          owner_name: ownerName,
          logo_url: logoUrl,
          user_id: authData.user.id,
          plan_type: planType
        });
        
      if (storeError) throw storeError;
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login na sua conta."
      });
      
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Erro ao fazer cadastro",
        description: error.message || "Verifique seus dados e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const value = {
    session,
    user,
    storeData,
    signIn,
    signUp,
    signOut,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
