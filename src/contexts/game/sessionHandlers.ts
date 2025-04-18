
import { supabase } from "@/integrations/supabase/client";

export async function createGameSession() {
  const { data, error } = await supabase
    .from('another_weather_game')
    .insert([{ hits: 0 }])
    .select()
    .single();
  
  if (error) console.error('Error creating session:', error);
  return data?.id;
}

export async function updateSessionHits(sessionId: string | null, hits: number) {
  if (!sessionId || hits <= 0) return;
  
  const { error } = await supabase
    .from('another_weather_game')
    .update({ hits })
    .eq('id', sessionId);
  
  if (error) console.error('Error updating session:', error);
}
