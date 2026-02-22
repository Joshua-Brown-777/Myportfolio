import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { WavyText } from "./WavyText";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to a backend
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black via-indigo-950/40 to-black relative overflow-hidden">
      {/* Colorful accent orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-600/12 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="mb-4" style={{ color: 'transparent' }}><WavyText text="Get In Touch" large /></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? <span style={{ 
              background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Feel free to reach out!</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="mb-6 text-2xl" style={{
              background: 'linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 4px 12px rgba(34, 211, 238, 0.3)' }}
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-foreground mb-1 text-lg font-medium">Email</p>
                  <p className="text-muted-foreground text-base">joshuagbrown777@gmail.com</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)' }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-foreground mb-1 text-lg font-medium">Phone</p>
                  <p className="text-muted-foreground text-base">+44 7706 653835</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: '0 4px 12px rgba(244, 114, 182, 0.3)' }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-foreground mb-1 text-lg font-medium">Location</p>
                  <p className="text-muted-foreground text-base">Belfast, UK</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-400/40"
            style={{ boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)' }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
