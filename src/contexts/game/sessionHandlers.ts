
import { supabase } from "@/integrations/supabase/client";

export async function createGameSession() {
  try {
    const { data, error } = await supabase
      .from('another_weather_game')
      .insert([{ hits: 0 }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating session:', error);
      return null;
    }
    
    console.log('Created new game session with ID:', data?.id);
    return data?.id;
  } catch (err) {
    console.error('Exception creating session:', err);
    return null;
  }
}

export async function updateSessionHits(sessionId: string | null, hits: number) {
  if (!sessionId) {
    console.error('Cannot update hits: No session ID provided');
    return;
  }
  
  if (hits <= 0) {
    console.log(`Not updating hits (${hits}) for session ${sessionId}`);
    return;
  }
  
  try {
    console.log(`Updating session ${sessionId} with ${hits} hits`);
    
    const { data, error } = await supabase
      .from('another_weather_game')
      .update({ hits })
      .eq('id', sessionId)
      .select();
    
    if (error) {
      console.error('Error updating session hits:', error);
    } else {
      console.log(`Successfully updated session ${sessionId} with ${hits} hits, response:`, data);
    }
  } catch (err) {
    console.error('Exception updating session hits:', err);
  }
}
