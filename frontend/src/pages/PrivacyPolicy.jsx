import Breadcrumb from '../components/common/Breadcrumb';

const sections = [
  { title: 'Information We Collect', text: 'We collect information you provide directly (name, email, shipping address, payment details) and information collected automatically (browser type, device, pages visited) to improve your shopping experience.' },
  { title: 'How We Use Your Information', text: 'Your information is used to process orders, provide customer support, personalize your experience, and send you updates about products and promotions if you opt in.' },
  { title: 'Cookies', text: 'AppleOn uses cookies to remember your cart, wishlist, and preferences. You can disable cookies in your browser settings, though some features may not work correctly.' },
  { title: 'Data Sharing', text: 'We never sell your personal information. Data is shared only with trusted partners (payment processors, shipping carriers) strictly to fulfill your order.' },
  { title: 'Your Rights', text: 'You may request access to, correction of, or deletion of your personal data at any time by contacting support@appleon.com.' },
];

export default function PrivacyPolicy() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      <div className="container-app py-14 sm:py-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-3">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: January 2026</p>
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-semibold text-primary-dark text-lg mb-2">{s.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
