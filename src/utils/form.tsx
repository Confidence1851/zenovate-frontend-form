import AccountCircle from '@/components/icons/accountCircle';
import LocalMall from '@/components/icons/localMall';
import Paid from '@/components/icons/paid';
import MedicalInformation from '@/components/icons/medicalInformation';
import Signature from '@/components/icons/signature';

export const formSidebarMenu = [
  {
    title: 'Your Information',
    icon: (className: string) => (
      <AccountCircle color={className} className={className} />
    ),
    subheading: 'Tell us a bit about your self',
    stepHighlights: 'info',
  },
  {
    title: 'Choose your Product',
    icon: (className: string) => (
      <LocalMall color={className} className={className} />
    ),
    subheading: 'Select the products that best fit your needs',
    stepHighlights: 'product',
  },
  {
    title: 'Payment Details',
    icon: (className: string) => (
      <Paid color={className} className={className} />
    ),
    subheading: 'Securely complete your payment',
    stepHighlights: 'payment',
  },
  {
    title: 'Answer a Few Questions',
    icon: (className: string) => (
      <MedicalInformation color={className} className={className} />
    ),
    subheading: 'Help us tailor our services to you',
    stepHighlights: 'questions',
  },
  {
    title: 'Review and Sign',
    icon: (className: string) => (
      <Signature color={className} className={className} />
    ),
    subheading: 'finalize your application  ',
    stepHighlights: 'sign',
  },
];


export function formUrl(id: any){
  return `/form/${id}`;
}

