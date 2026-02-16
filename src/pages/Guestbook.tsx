import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

// 임시 샘플 데이터 (Supabase 연결 후 제거)
const sampleMessages: GuestbookMessage[] = [
  {
    id: 1,
    name: "김민수",
    message: "항상 시민을 위해 노력해주셔서 감사합니다. 더 좋은 대한민국을 만들어가시길 응원합니다!",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "이영희",
    message: "민주주의의 가치를 지키기 위한 노력이 보입니다. 응원합니다!",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    name: "박준호",
    message: "청년 정책에 많은 관심을 가져주셔서 감사합니다. 앞으로도 좋은 정책 부탁드립니다.",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 4,
    name: "최지은",
    message: "강북 지역 발전을 위해 노력해주시는 모습이 보기 좋습니다. 계속 응원하겠습니다!",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 5,
    name: "정태영",
    message: "환경 보호 정책 발표 감사합니다. 지속 가능한 미래를 위해 함께 노력하겠습니다.",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 6,
    name: "한소영",
    message: "항상 시민의 목소리에 귀기울여주셔서 감사합니다. 더 좋은 정책 기대하겠습니다!",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
];

const Guestbook = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>(sampleMessages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Supabase에서 메시지 불러오기 (Supabase 연결 후 활성화)
  useEffect(() => {
    // const loadMessages = async () => {
    //   if (!supabase) return;
    //   const { data, error } = await supabase
    //     .from('guestbook')
    //     .select('*')
    //     .order('created_at', { ascending: false });
    //   if (data) setMessages(data);
    // };
    // loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Supabase에 메시지 저장 (Supabase 연결 후 활성화)
      // if (supabase) {
      //   const { error } = await supabase
      //     .from('guestbook')
      //     .insert([{
      //       name: formData.name,
      //       message: formData.message,
      //       password: formData.password, // 실제로는 해시화해서 저장
      //     }]);
      //   if (error) throw error;
      // }

      // 임시: 로컬 상태에 추가
      const newMessage: GuestbookMessage = {
        id: messages.length + 1,
        name: formData.name,
        message: formData.message,
        createdAt: new Date().toISOString(),
      };
      setMessages([newMessage, ...messages]);

      // 폼 초기화 및 모달 닫기
      setFormData({ name: "", password: "", message: "" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main className="pt-32 pb-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight">
              방명록
            </h1>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="break-inside-avoid mb-6 bg-[#111111] border border-white/10 rounded-lg p-6 relative group hover:border-white/20 transition-all duration-300"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 h-6 w-6 text-white/10 group-hover:text-white/20 transition-colors" />
                
                {/* Message Content */}
                <div className="pr-8">
                  <p className="text-slate-200 text-sm leading-relaxed mb-4">
                    {message.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-100 text-sm font-medium">
                      {message.name}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {format(new Date(message.createdAt), "yyyy.MM.dd")}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-white text-black rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 z-40 flex items-center gap-2"
        aria-label="응원 메시지 쓰기"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-sm font-medium hidden md:inline">응원 메시지 쓰기</span>
      </motion.button>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#111111] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">응원 메시지 작성</DialogTitle>
            <DialogDescription className="text-slate-400">
              따뜻한 응원의 메시지를 남겨주세요.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm text-slate-300 mb-2 block">
                이름
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-black border-white/10 text-white placeholder:text-slate-500"
                placeholder="이름을 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-slate-300 mb-2 block">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-black border-white/10 text-white placeholder:text-slate-500"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-slate-300 mb-2 block">
                메시지
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="bg-black border-white/10 text-white placeholder:text-slate-500"
                placeholder="응원 메시지를 입력하세요"
              />
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-white/10 text-white hover:bg-white/10"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black hover:bg-white/90"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Guestbook;
