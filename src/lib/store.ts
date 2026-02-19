// Supabase를 사용한 데이터 저장소

import { supabase } from './supabase';

export interface PressItem {
  id: number;
  title: string;
  publisher: string;
  date: string;
  image?: string;
  link?: string;
}

export interface MediaItem {
  id: number;
  title: string;
  channel: string;
  thumbnail?: string;
  link?: string;
  type: "long-form" | "shorts";
}

export interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

// Press 관련 함수
export async function getPressItems(): Promise<PressItem[]> {
  try {
    const { data, error } = await supabase
      .from('press')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching press items:', error);
      return [];
    }
    
    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      publisher: item.publisher || '',
      date: item.date || '',
      image: item.image || undefined,
      link: item.link || undefined,
    }));
  } catch (error) {
    console.error('Error fetching press items:', error);
    return [];
  }
}

export async function addPressItem(item: Omit<PressItem, 'id'>): Promise<PressItem | null> {
  try {
    const { data, error } = await supabase
      .from('press')
      .insert([{
        title: item.title,
        publisher: item.publisher,
        date: item.date,
        image: item.image,
        link: item.link,
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding press item:', error);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      publisher: data.publisher || '',
      date: data.date || '',
      image: data.image || undefined,
      link: data.link || undefined,
    };
  } catch (error) {
    console.error('Error adding press item:', error);
    return null;
  }
}

export async function deletePressItem(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('press')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting press item:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting press item:', error);
    return false;
  }
}

// Media 관련 함수
export async function getMediaLongForm(): Promise<MediaItem[]> {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('type', 'long-form')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching media long-form:', error);
      return [];
    }
    
    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      channel: item.channel || '',
      thumbnail: item.thumbnail || undefined,
      link: item.link || undefined,
      type: 'long-form' as const,
    }));
  } catch (error) {
    console.error('Error fetching media long-form:', error);
    return [];
  }
}

export async function addMediaLongForm(item: Omit<MediaItem, 'id' | 'type'>): Promise<MediaItem | null> {
  try {
    const { data, error } = await supabase
      .from('media')
      .insert([{
        title: item.title,
        channel: item.channel,
        thumbnail: item.thumbnail,
        link: item.link,
        type: 'long-form',
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding media long-form:', error);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      channel: data.channel || '',
      thumbnail: data.thumbnail || undefined,
      link: data.link || undefined,
      type: 'long-form' as const,
    };
  } catch (error) {
    console.error('Error adding media long-form:', error);
    return null;
  }
}

export async function deleteMediaLongForm(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)
      .eq('type', 'long-form');
    
    if (error) {
      console.error('Error deleting media long-form:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting media long-form:', error);
    return false;
  }
}

export async function getMediaShorts(): Promise<MediaItem[]> {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .eq('type', 'shorts')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching media shorts:', error);
      return [];
    }
    
    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      channel: item.channel || '',
      thumbnail: item.thumbnail || undefined,
      link: item.link || undefined,
      type: 'shorts' as const,
    }));
  } catch (error) {
    console.error('Error fetching media shorts:', error);
    return [];
  }
}

export async function addMediaShorts(item: Omit<MediaItem, 'id' | 'type'>): Promise<MediaItem | null> {
  try {
    const { data, error } = await supabase
      .from('media')
      .insert([{
        title: item.title,
        channel: item.channel,
        thumbnail: item.thumbnail,
        link: item.link,
        type: 'shorts',
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding media shorts:', error);
      return null;
    }
    
    return {
      id: data.id,
      title: data.title,
      channel: data.channel || '',
      thumbnail: data.thumbnail || undefined,
      link: data.link || undefined,
      type: 'shorts' as const,
    };
  } catch (error) {
    console.error('Error adding media shorts:', error);
    return null;
  }
}

export async function deleteMediaShorts(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', id)
      .eq('type', 'shorts');
    
    if (error) {
      console.error('Error deleting media shorts:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting media shorts:', error);
    return false;
  }
}

// Guestbook 관련 함수
export async function getGuestbookMessages(): Promise<GuestbookMessage[]> {
  try {
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching guestbook messages:', error);
      return [];
    }
    
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      message: item.message,
      createdAt: item.created_at || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching guestbook messages:', error);
    return [];
  }
}

export async function addGuestbookMessage(item: Omit<GuestbookMessage, 'id' | 'createdAt'>): Promise<GuestbookMessage | null> {
  try {
    const { data, error } = await supabase
      .from('guestbook')
      .insert([{
        name: item.name,
        message: item.message,
        password: (item as any).password, // password는 선택사항
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding guestbook message:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      message: data.message,
      createdAt: data.created_at || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error adding guestbook message:', error);
    return null;
  }
}

export async function deleteGuestbookMessage(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting guestbook message:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting guestbook message:', error);
    return false;
  }
}
