import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { getGuestbookMessages, addGuestbookMessage, type GuestbookMessage } from "@/lib/store";

const Guestbook = () => {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const msgs = await getGuestbookMessages();
      setMessages(msgs);
    };
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newMessage = await addGuestbookMessage({
        name: formData.name,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
      
      if (newMessage) {
        setMessages([newMessage, ...messages]);
        setFormData({ name: "", password: "", message: "" });
        setIsModalOpen(false);
      }
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
