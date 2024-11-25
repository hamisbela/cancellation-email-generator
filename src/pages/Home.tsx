import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, XCircle, Star, Copy, Check } from 'lucide-react';
import { genAI } from '@/lib/gemini';

export default function Home() {
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate a professional and polite cancellation email (between 100-200 words) based on this context: ${description}. The email should be clear, concise, and respectful while firmly requesting service termination. Include necessary account details placeholder and maintain a professional tone. Avoid unnecessary explanations or emotional language.`;
      
      const result = await model.generateContent(prompt);
      setEmail(result.response.text());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the cancellation email');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text leading-tight">
            AI Cancellation Email Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Generate professional cancellation emails in seconds! 📧
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe what you want to cancel (subscription, service, membership) and include any relevant details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-blue-400"
              />
              
              <Button 
                onClick={generateEmail}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-5 w-5" />
                    Generate Cancellation Email ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {email && (
          <Card className="p-6 mb-12 hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h3 className="text-xl font-semibold">Your Cancellation Email</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 hover:bg-blue-50"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {email}
            </p>
          </Card>
        )}

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 mb-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-blue-500" />
            <h2 className="text-2xl font-bold">Support Our Work 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
              Free AI Cancellation Email Generator: Professional Service Termination Made Easy ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Our Free AI Cancellation Email Generator helps you create professional, polite, and effective 
                cancellation emails in seconds. Whether you're terminating a subscription, membership, or service,
                our AI ensures your message is clear and professional.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-blue-500" />
                  The #1 AI Cancellation Email Generator 📧
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">✉️</span>
                    <span>Professional and polite cancellation emails</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>AI-powered technology for perfect tone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Generate emails in seconds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Clear and effective communication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>Free to use with unlimited generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Perfect For Every Cancellation 📝</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI cancellation email generator is perfect for:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Subscription cancellations</li>
                  <li>• Membership terminations</li>
                  <li>• Service discontinuations</li>
                  <li>• Contract terminations</li>
                  <li>• Account closures</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Tips for Effective Cancellations ✍️</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Include all relevant account information</li>
                  <li>Be clear about your request</li>
                  <li>Maintain a professional tone</li>
                  <li>Specify cancellation timeline</li>
                  <li>Request confirmation</li>
                </ol>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}