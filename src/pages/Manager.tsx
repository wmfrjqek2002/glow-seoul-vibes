import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getPressItems,
  addPressItem,
  deletePressItem,
  getMediaLongForm,
  addMediaLongForm,
  deleteMediaLongForm,
  getMediaShorts,
  addMediaShorts as addMediaShortsItem,
  deleteMediaShorts,
  getGuestbookMessages,
  deleteGuestbookMessage,
  type PressItem,
  type MediaItem,
  type GuestbookMessage,
} from "@/lib/store";
import { format } from "date-fns";
import { Trash2, LogOut, FileText, Video, MessageSquare, Loader2 } from "lucide-react";

const MANAGER_AUTH_KEY = "glow_seoul_manager_auth";
const DEFAULT_ID = import.meta.env.VITE_MANAGER_ID || "admin";
const DEFAULT_PW = import.meta.env.VITE_MANAGER_PASSWORD || "admin123";

const Manager = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  // Press
  const [pressItems, setPressItemsState] = useState<PressItem[]>([]);
  const [pressForm, setPressForm] = useState({ title: "", publisher: "", date: "", image: "", link: "" });

  // Media
  const [mediaLong, setMediaLongState] = useState<MediaItem[]>([]);
  const [mediaShorts, setMediaShortsState] = useState<MediaItem[]>([]);
  const [mediaLongForm, setMediaLongFormState] = useState({ title: "", channel: "", thumbnail: "", link: "" });
  const [mediaShortsForm, setMediaShortsFormState] = useState({ title: "", channel: "", thumbnail: "", link: "" });

  // Guestbook
  const [guestbookMessages, setGuestbookMessagesState] = useState<GuestbookMessage[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem(MANAGER_AUTH_KEY);
    setIsLoggedIn(!!auth);
    if (auth) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [press, longForm, shorts, guestbook] = await Promise.all([
        getPressItems(),
        getMediaLongForm(),
        getMediaShorts(),
        getGuestbookMessages(),
      ]);
      setPressItemsState(press);
      setMediaLongState(longForm);
      setMediaShortsState(shorts);
      setGuestbookMessagesState(guestbook);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (loginId === DEFAULT_ID && loginPw === DEFAULT_PW) {
      sessionStorage.setItem(MANAGER_AUTH_KEY, "1");
      setIsLoggedIn(true);
      loadData();
    } else {
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(MANAGER_AUTH_KEY);
    setIsLoggedIn(false);
  };

  // Press
  const addPress = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newItem = await addPressItem({
        title: pressForm.title,
        publisher: pressForm.publisher,
        date: pressForm.date,
        image: pressForm.image || undefined,
        link: pressForm.link || undefined,
      });
      if (newItem) {
        setPressItemsState([newItem, ...pressItems]);
        setPressForm({ title: "", publisher: "", date: "", image: "", link: "" });
      }
    } catch (error) {
      console.error('Error adding press:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePress = async (id: number) => {
    setLoading(true);
    try {
      const success = await deletePressItem(id);
      if (success) {
        setPressItemsState(pressItems.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting press:', error);
    } finally {
      setLoading(false);
    }
  };

  // Media Long
  const addMediaLong = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newItem = await addMediaLongForm({
        title: mediaLongForm.title,
        channel: mediaLongForm.channel,
        thumbnail: mediaLongForm.thumbnail || undefined,
        link: mediaLongForm.link || undefined,
      });
      if (newItem) {
        setMediaLongState([newItem, ...mediaLong]);
        setMediaLongFormState({ title: "", channel: "", thumbnail: "", link: "" });
      }
    } catch (error) {
      console.error('Error adding media long-form:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaLong = async (id: number) => {
    setLoading(true);
    try {
      const success = await deleteMediaLongForm(id);
      if (success) {
        setMediaLongState(mediaLong.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting media long-form:', error);
    } finally {
      setLoading(false);
    }
  };

  // Media Shorts
  const addMediaShorts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newItem = await addMediaShortsItem({
        title: mediaShortsForm.title,
        channel: mediaShortsForm.channel,
        thumbnail: mediaShortsForm.thumbnail || undefined,
        link: mediaShortsForm.link || undefined,
      });
      if (newItem) {
        setMediaShortsState([newItem, ...mediaShorts]);
        setMediaShortsFormState({ title: "", channel: "", thumbnail: "", link: "" });
      }
    } catch (error) {
      console.error('Error adding media shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMediaShorts = async (id: number) => {
    setLoading(true);
    try {
      const success = await deleteMediaShorts(id);
      if (success) {
        setMediaShortsState(mediaShorts.filter((i) => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting media shorts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Guestbook
  const deleteGuestbook = async (id: number) => {
    setLoading(true);
    try {
      const success = await deleteGuestbookMessage(id);
      if (success) {
        setGuestbookMessagesState(guestbookMessages.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting guestbook:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-[#111] border-white/10">
          <CardHeader>
            <CardTitle className="text-white">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-1">아이디</label>
                <Input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="bg-black border-white/10 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 block mb-1">비밀번호</label>
                <Input
                  type="password"
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  className="bg-black border-white/10 text-white"
                  required
                />
              </div>
              {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">관리자</h1>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/20 text-white" disabled={loading}>
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
        )}

        <Tabs defaultValue="press" className="space-y-6">
          <TabsList className="bg-[#111] border border-white/10">
            <TabsTrigger value="press" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <FileText className="w-4 h-4 mr-2" />
              보도 관리
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Video className="w-4 h-4 mr-2" />
              미디어 관리
            </TabsTrigger>
            <TabsTrigger value="guestbook" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <MessageSquare className="w-4 h-4 mr-2" />
              방명록 관리
            </TabsTrigger>
          </TabsList>

          <TabsContent value="press" className="space-y-6">
            <Card className="bg-[#111] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">보도 추가</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={addPress} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="제목"
                    value={pressForm.title}
                    onChange={(e) => setPressForm({ ...pressForm, title: e.target.value })}
                    className="bg-black border-white/10 text-white"
                    required
                    disabled={loading}
                  />
                  <Input
                    placeholder="매체(출판사)"
                    value={pressForm.publisher}
                    onChange={(e) => setPressForm({ ...pressForm, publisher: e.target.value })}
                    className="bg-black border-white/10 text-white"
                    disabled={loading}
                  />
                  <Input
                    placeholder="날짜 (예: 2024.01.01)"
                    value={pressForm.date}
                    onChange={(e) => setPressForm({ ...pressForm, date: e.target.value })}
                    className="bg-black border-white/10 text-white"
                    disabled={loading}
                  />
                  <Input
                    placeholder="이미지 URL"
                    value={pressForm.image}
                    onChange={(e) => setPressForm({ ...pressForm, image: e.target.value })}
                    className="bg-black border-white/10 text-white"
                    disabled={loading}
                  />
                  <Input
                    placeholder="링크 URL"
                    value={pressForm.link}
                    onChange={(e) => setPressForm({ ...pressForm, link: e.target.value })}
                    className="bg-black border-white/10 text-white md:col-span-2"
                    disabled={loading}
                  />
                  <Button type="submit" className="bg-white text-black hover:bg-white/90" disabled={loading}>
                    {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    추가
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-2">
              <h3 className="font-medium text-slate-300">등록된 보도 ({pressItems.length})</h3>
              <ul className="space-y-2">
                {pressItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#111] border border-white/10"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-white font-medium truncate block">{item.title}</span>
                      <span className="text-slate-500 text-sm">{item.publisher} · {item.date}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => deletePress(item.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Long-form 추가</h3>
              <Card className="bg-[#111] border-white/10 mb-6">
                <CardContent className="pt-6">
                  <form onSubmit={addMediaLong} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="제목"
                      value={mediaLongForm.title}
                      onChange={(e) => setMediaLongFormState({ ...mediaLongForm, title: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      required
                      disabled={loading}
                    />
                    <Input
                      placeholder="채널 이름"
                      value={mediaLongForm.channel}
                      onChange={(e) => setMediaLongFormState({ ...mediaLongForm, channel: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Input
                      placeholder="썸네일 URL"
                      value={mediaLongForm.thumbnail}
                      onChange={(e) => setMediaLongFormState({ ...mediaLongForm, thumbnail: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Input
                      placeholder="링크 URL"
                      value={mediaLongForm.link}
                      onChange={(e) => setMediaLongFormState({ ...mediaLongForm, link: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Button type="submit" className="bg-white text-black hover:bg-white/90 md:col-span-2" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Long-form 추가
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <ul className="space-y-2">
                {mediaLong.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#111] border border-white/10"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-white font-medium truncate block">{item.title}</span>
                      <span className="text-slate-500 text-sm">{item.channel}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => deleteMediaLong(item.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Shorts 추가</h3>
              <Card className="bg-[#111] border-white/10 mb-6">
                <CardContent className="pt-6">
                  <form onSubmit={addMediaShorts} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="제목"
                      value={mediaShortsForm.title}
                      onChange={(e) => setMediaShortsFormState({ ...mediaShortsForm, title: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      required
                      disabled={loading}
                    />
                    <Input
                      placeholder="채널 이름"
                      value={mediaShortsForm.channel}
                      onChange={(e) => setMediaShortsFormState({ ...mediaShortsForm, channel: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Input
                      placeholder="썸네일 URL"
                      value={mediaShortsForm.thumbnail}
                      onChange={(e) => setMediaShortsFormState({ ...mediaShortsForm, thumbnail: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Input
                      placeholder="링크 URL"
                      value={mediaShortsForm.link}
                      onChange={(e) => setMediaShortsFormState({ ...mediaShortsForm, link: e.target.value })}
                      className="bg-black border-white/10 text-white"
                      disabled={loading}
                    />
                    <Button type="submit" className="bg-white text-black hover:bg-white/90 md:col-span-2" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Shorts 추가
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <ul className="space-y-2">
                {mediaShorts.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-[#111] border border-white/10"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-white font-medium truncate block">{item.title}</span>
                      <span className="text-slate-500 text-sm">{item.channel}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300"
                      onClick={() => deleteMediaShorts(item.id)}
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="guestbook" className="space-y-6">
            <p className="text-slate-400 text-sm">방명록 항목을 삭제할 수 있습니다.</p>
            <ul className="space-y-2">
              {guestbookMessages.map((msg) => (
                <li
                  key={msg.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#111] border border-white/10"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium">{msg.name}</p>
                    <p className="text-slate-400 text-sm line-clamp-2 mt-1">{msg.message}</p>
                    <p className="text-slate-500 text-xs mt-1">{format(new Date(msg.createdAt), "yyyy.MM.dd HH:mm")}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300 shrink-0"
                    onClick={() => deleteGuestbook(msg.id)}
                    disabled={loading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Manager;
