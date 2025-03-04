import {
  Brain,
  Globe,
  Check,
  Users,
  TrendingUp,
  Book,
  Lock,
  ChartBar,
  Rocket,
  Star,
  Code,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaUserGroup } from 'react-icons/fa6';

const LandingPage = () => {
  const competitorComparison = [
    {
      feature: 'AI-Powered Learning',
      BrainFlip: true,
      Competitor1: false,
      Competitor2: false,
    },
    {
      feature: 'Cross-Platform Sync',
      BrainFlip: true,
      Competitor1: true,
      Competitor2: false,
    },
    {
      feature: 'Unlimited Decks',
      BrainFlip: true,
      Competitor1: false,
      Competitor2: true,
    },
    {
      feature: 'Advanced Analytics',
      BrainFlip: true,
      Competitor1: false,
      Competitor2: false,
    },
    {
      feature: 'Collaborative Learning',
      BrainFlip: true,
      Competitor1: false,
      Competitor2: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Medical Student',
      text: "BrainFlip revolutionized my study routine. The AI adaptation is incredible! I've seen a 40% improvement in my retention rates.",
      avatar: '/api/placeholder/80/80',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Software Engineer',
      text: "Intuitive interface and powerful learning algorithms. Best study tool I've used. The personalized learning path is a game-changer.",
      avatar: '/api/placeholder/80/80',
    },
    {
      name: 'Emily Chen',
      role: 'Law Student',
      text: 'Collaborative features and personalized learning paths are game-changers. I can now study more efficiently and effectively.',
      avatar: '/api/placeholder/80/80',
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description:
        'Adaptive algorithms personalize your study experience, identifying your strengths and weaknesses',
      color: 'text-blue-500',
    },
    {
      icon: Globe,
      title: 'Multi-Platform',
      description:
        'Study seamlessly across devices with perfect synchronization and offline mode',
      color: 'text-green-500',
    },
    {
      icon: Users,
      title: 'Collaborative Study',
      description:
        'Create and join study groups, share decks, and learn together in real-time',
      color: 'text-purple-500',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description:
        'Detailed analytics and insights to monitor your learning journey and improvement',
      color: 'text-orange-500',
    },
  ];

  const advancedFeatures = [
    {
      icon: ChartBar,
      title: 'Advanced Analytics',
      description:
        'Comprehensive insights into your learning patterns, performance metrics, and predictive learning recommendations',
      color: 'text-teal-500',
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description:
        'Military-grade encryption and privacy controls to protect your personal learning data',
      color: 'text-red-500',
    },
    {
      icon: Rocket,
      title: 'Performance Acceleration',
      description:
        'AI-driven study optimization that helps you learn faster and retain more information',
      color: 'text-indigo-500',
    },
    {
      icon: FaUserGroup,
      title: 'Community Learning',
      description:
        'Access to a global community of learners, expert-curated content, and collaborative study resources',
      color: 'text-pink-500',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      features: [
        'Basic AI Learning',
        'Limited Deck Creation',
        'Single Device Sync',
        'Community Support',
      ],
      buttonText: 'Start Free',
      featured: false,
    },
    {
      name: 'Pro',
      price: 9.99,
      features: [
        'Advanced AI Learning',
        'Unlimited Deck Creation',
        'Multi-Device Sync',
        'Priority Support',
        'Detailed Analytics',
      ],
      buttonText: 'Go Pro',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 49.99,
      features: [
        'Team Collaboration',
        'Custom AI Models',
        'Advanced Security',
        'Dedicated Support',
        'Organization-wide Insights',
      ],
      buttonText: 'Contact Sales',
      featured: false,
    },
  ];

  return (
    <div className="dark bg-gray-950 text-white min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold tracking-tight">BrainFlip</h1>
          </div>
          <div className="space-x-4">
            <Link
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              href="/login"
            >
              Login
            </Link>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section with Placeholder Image */}
      <main className="pt-24 container mx-auto px-4">
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm">
              Future of Learning
            </div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight">
              Smart Flashcards, <br />
              <span className="text-blue-500">Intelligent Learning</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Transform your study strategy with AI-powered flashcards that
              adapt to your unique learning style.
            </p>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                Start Learning
              </button>
              <button className="px-6 py-3 border border-gray-700 text-gray-300 rounded-full hover:bg-gray-800 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/screenshot.png"
              alt="BrainFlip Learning Interface"
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Designed to make learning effortless and engaging
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all"
              >
                <feature.icon className={`mb-4 ${feature.color}`} size={48} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Competitor Comparison */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose BrainFlip?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We stand out from the competition
            </p>
          </div>
          <div className="bg-gray-900 rounded-2xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-4 text-left">Features</th>
                  <th className="p-4">BrainFlip</th>
                  <th className="p-4">Competitor 1</th>
                  <th className="p-4">Competitor 2</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((comparison, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="p-4">{comparison.feature}</td>
                    <td className="p-4 text-center">
                      {comparison.BrainFlip ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {comparison.Competitor1 ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {comparison.Competitor2 ? (
                        <Check className="mx-auto text-green-500" />
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real stories from students who've transformed their learning
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Advanced Learning Technologies
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Cutting-edge features designed to supercharge your learning
                experience
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {advancedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all"
                >
                  <feature.icon className={`mb-4 ${feature.color}`} size={48} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Flexible Pricing Plans
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Choose the plan that fits your learning needs and budget
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`bg-gray-900 p-8 rounded-2xl border ${
                    plan.featured
                      ? 'border-blue-500 shadow-2xl scale-105'
                      : 'border-gray-800'
                  } transition-all`}
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-400 ml-2">
                      {plan.price === 0 ? 'Forever' : 'per month'}
                    </span>
                  </div>
                  <ul className="mb-8 space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="mr-2 text-green-500" size={20} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-full transition-colors ${
                      plan.featured
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'border border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration and Compatibility Section */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Seamless Integration</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                BrainFlip works with your favorite learning platforms and tools
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Book className="mx-auto mb-4 text-green-500" size={64} />
                <h3 className="text-xl font-bold mb-2">
                  Learning Management Systems
                </h3>
                <p className="text-gray-400">
                  Direct integration with Moodle, Canvas, and Blackboard
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Code className="mx-auto mb-4 text-blue-500" size={64} />
                <h3 className="text-xl font-bold mb-2">Developer Friendly</h3>
                <p className="text-gray-400">
                  Open API and webhooks for custom integrations
                </p>
              </div>
              <div className="bg-gray-800 p-8 rounded-2xl">
                <Star className="mx-auto mb-4 text-yellow-500" size={64} />
                <h3 className="text-xl font-bold mb-2">Cross-Platform</h3>
                <p className="text-gray-400">
                  Available on Web, iOS, Android, and desktop applications
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12 rounded-3xl">
            <h2 className="text-4xl font-bold mb-6">
              Transform Your Learning Today
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who've revolutionized their study
              habits with BrainFlip. Start your personalized learning journey
              now.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors font-bold shadow-lg">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors shadow-md">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Got questions? We've got answers.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                {
                  question: 'Is BrainFlip suitable for all types of learners?',
                  answer:
                    'Absolutely! Our AI-powered platform adapts to individual learning styles, making it perfect for students, professionals, and lifelong learners across various disciplines.',
                },
                {
                  question: 'How secure is my data?',
                  answer:
                    'We take data privacy seriously. BrainFlip uses military-grade encryption and follows strict data protection regulations to ensure your personal information remains confidential.',
                },
                {
                  question: 'Can I use BrainFlip offline?',
                  answer:
                    'Yes! Our multi-platform support includes offline mode, allowing you to study anytime, anywhere, without an internet connection.',
                },
                {
                  question: 'Do you offer student discounts?',
                  answer:
                    'We provide special pricing for students. Contact our sales team for personalized educational pricing and institutional packages.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all"
                >
                  <h3 className="text-xl font-bold mb-2 text-blue-400">
                    {faq.question}
                  </h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold">BrainFlip</h3>
              </div>
              <p className="text-gray-400">
                Revolutionizing learning through intelligent, adaptive
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                {['Features', 'Pricing', 'Integrations', 'Updates'].map(
                  (item, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-400 transition-colors"
                    >
                      <a href="#">{item}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                {['About', 'Careers', 'Press', 'Contact'].map((item, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-400 transition-colors"
                  >
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                {['Terms', 'Privacy', 'Cookies', 'Security'].map(
                  (item, index) => (
                    <li
                      key={index}
                      className="hover:text-blue-400 transition-colors"
                    >
                      <a href="#">{item}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} BrainFlip. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
