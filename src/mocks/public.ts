/**
 * Mock content for the public pages during the UI phase. Legal texts and contact details move to
 * the backend (CMS/settings) once the API is wired.
 */
import type { LocalizedText } from '@/composables/useLocalizedText'
import type { AppLocale } from '@/plugins/i18n'

/* ------------------------------------------------------------------ Landing */

/** Arabic writes the figure as the design does (+50.000); English and Urdu as 50,000+. */
export const landingStats: readonly { key: string; value: LocalizedText }[] = [
  { key: 'parts', value: { ar: '+50.000', en: '50,000+', ur: '50,000+' } },
  { key: 'categories', value: '14' },
  { key: 'brands', value: '22' },
  { key: 'carMakes', value: '24' },
]

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
}

function repeatTestimonials(quote: string, name: string, role: string): Testimonial[] {
  return Array.from({ length: 15 }, (_, index) => ({ id: `t-${index + 1}`, quote, name, role }))
}

export const testimonials: Record<AppLocale, Testimonial[]> = {
  ar: repeatTestimonials(
    'البحث عن القطع ومتابعة الطلبات من مكان واحد بيساعدنا ننظم شغلنا بشكل أفضل.',
    'أحمد محمد',
    'تاجر قطع غيار سيارات',
  ),
  en: repeatTestimonials(
    'Finding parts and tracking orders in one place helps us run our business better.',
    'Ahmed Mohammed',
    'Car parts trader',
  ),
  ur: repeatTestimonials(
    'پرزوں کی تلاش اور آرڈرز کی نگرانی ایک ہی جگہ سے کرنے سے ہمیں اپنا کام بہتر طریقے سے منظم کرنے میں مدد ملتی ہے۔',
    'احمد محمد',
    'گاڑیوں کے اسپیئر پارٹس کے تاجر',
  ),
}

/* ------------------------------------------------------------------ Contact */

export const contactDetails = {
  phone: '+966 1234567890',
  phoneHref: 'tel:+9661234567890',
  email: 'username@gmail.com',
}

/** Signed-in account used to prefill the contact form until the session API exists. */
export const contactSender = {
  name: 'فهد العتيبي',
  email: 'username@gmail.com',
}

/* -------------------------------------------------------------------- Legal */

/** Legal copy. Text may mark bold runs with `**…**` (rendered as <strong>, never as HTML). */
export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; ordered?: boolean; items: Array<string | { text: string; items: string[] }> }

export interface LegalSection {
  id: string
  title: string
  blocks: LegalBlock[]
}

export const privacyPolicy: Record<AppLocale, LegalSection[]> = {
  ar: [
    {
      id: 'introduction',
      title: 'مقدمة',
      blocks: [
        {
          type: 'paragraph',
          text: 'مرحبًا بك في Parts X، المنصة الإلكترونية المتخصصة في ربط موردي قطع غيار السيارات بتجار التجزئة، وتسهيل البحث عن المنتجات وطلبها وطلب عروض الأسعار وإدارة عمليات الشراء والمدفوعات والفواتير.',
        },
        {
          type: 'paragraph',
          text: 'تحترم Parts X خصوصية المستخدمين وتلتزم بحماية البيانات الشخصية والتجارية التي يتم جمعها من خلال الموقع والخدمات المرتبطة به. توضح هذه السياسة أنواع البيانات التي نجمعها، وكيفية استخدامها وحمايتها ومشاركتها، والخيارات والحقوق المتاحة للمستخدمين بشأن بياناتهم.',
        },
        {
          type: 'paragraph',
          text: 'باستخدامك للمنصة، فإنك تقر باطلاعك على سياسة الخصوصية هذه. ولا يُعد ذلك بديلًا عن أي موافقة مستقلة تكون مطلوبة نظامًا لمعالجة بيانات معينة.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'نطاق تطبيق السياسة',
      blocks: [
        { type: 'paragraph', text: 'تسري هذه السياسة على جميع مستخدمي منصة Parts X، بما في ذلك:' },
        {
          type: 'list',
          items: [
            'التجار: الذين يستخدمون المنصة للبحث عن قطع غيار السيارات وشرائها وطلب عروض الأسعار.',
            'الموردون: الذين يعرضون منتجاتهم ويديرون المخزون والأسعار ويتلقون طلبات الشراء وعروض الأسعار.',
            'ممثلو المنشآت: الذين ينشئون الحسابات أو يديرونها نيابة عن الشركات والمؤسسات.',
          ],
        },
      ],
    },
    {
      id: 'data-collected',
      title: 'البيانات التي نجمعها',
      blocks: [
        { type: 'paragraph', text: 'تسري هذه السياسة على جميع مستخدمي منصة Parts X، بما في ذلك:' },
        {
          type: 'list',
          items: [
            'التجار: الذين يستخدمون المنصة للبحث عن قطع غيار السيارات وشرائها وطلب عروض الأسعار.',
            'الموردون: الذقد تجمع المنصة الأنواع التالية من البيانات وفقًا لطبيعة استخدامك للخدمات:',
            {
              text: 'أ. بيانات الحساب والتسجيل',
              items: [
                'الاسم الكامل.',
                'عنوان البريد الإلكتروني.',
                'رقم الهاتف.',
                'اسم المنشأة أو الشركة.',
                'المسمى الوظيفي أو صفة المستخدم داخل المنشأة.',
                'بيانات تسجيل الدخول ووسائل التحقق من الهوية.',
                'بيانات الملف الشخصي والتفضيلات واللغة.ين يعرضون منتجاتهم ويديرون المخزون والأسعار ويتلقون طلبات الشراء وعروض الأسعار.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'collection',
      title: 'كيفية جمع البيانات',
      blocks: [
        { type: 'paragraph', text: 'نجمع البيانات من خلال الوسائل التالية:' },
        {
          type: 'list',
          items: [
            'البيانات التي تقدمها مباشرة عند إنشاء الحساب أو تحديثه.',
            'البيانات التي تدخلها عند إضافة المنتجات أو إنشاء الطلبات أو تقديم عروض الأسعار.',
            'البيانات الناتجة عن استخدامك للمنصة وإجراء المعاملات.',
            'البيانات التي تقدمها عند التواصل مع الدعم الفني أو تقديم شكوى.',
            'البيانات التي نتلقاها من مزودي الخدمات أو الجهات ذات العلاقة، عندما يكون ذلك مسموحًا نظامًا وضروريًا لتقديم الخدمة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'نحرص على جمع البيانات اللازمة للأغراض المحددة فقط، وتجنب طلب المعلومات غير الضرورية.',
        },
      ],
    },
    {
      id: 'usage',
      title: 'أغراض استخدام البيانات',
      blocks: [
        { type: 'paragraph', text: 'نستخدم البيانات التي نجمعها للأغراض التالية:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'إنشاء الحسابات والتحقق منها وإدارتها.',
            'تمكين التجار من البحث عن قطع الغيار والاطلاع على تفاصيل المنتجات.',
            'تمكين الموردين من إضافة المنتجات وإدارة الأسعار والمخزون.',
            'معالجة طلبات الشراء وطلبات عروض الأسعار وإدارة العروض التجارية.',
            'تنسيق عمليات التوريد والشحن والتسليم.',
            'إدارة المدفوعات والفواتير والإيصالات وعمليات الاسترداد.',
            'إرسال إشعارات الطلبات وتحديثات الدفع والشحن والتنبيهات المتعلقة بالحساب.',
            'تقديم الدعم الفني ومعالجة الشكاوى والنزاعات.',
            'حماية المنصة من الاحتيال والاستخدام غير المصرح به والأنشطة المخالفة.',
            'تحسين أداء المنصة وتجربة المستخدم وتطوير الخدمات.',
            'الوفاء بالالتزامات القانونية والتنظيمية والمحاسبية والضريبية.',
            'إرسال الرسائل التسويقية والعروض التجارية عند وجود أساس نظامي مناسب، مع إتاحة إلغاء الاشتراك حيثما ينطبق ذلك.',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: 'مشاركة البيانات مع الأطراف الأخرى',
      blocks: [
        {
          type: 'paragraph',
          text: 'لا نبيع البيانات الشخصية للمستخدمين إلى أطراف أخرى. وقد نشارك البيانات الضرورية في الحالات التالية:',
        },
        { type: 'subheading', text: 'أ. بين التجار والموردين' },
        {
          type: 'paragraph',
          text: 'قد تتم مشاركة البيانات اللازمة لإتمام التعامل التجاري، مثل تفاصيل المنتجات والكميات المطلوبة وبيانات التسليم ذات الصلة ومعلومات المنشأة المطلوبة لإصدار الفواتير أو تنفيذ الطلب.',
        },
        { type: 'subheading', text: 'ب. مزودو الخدمات' },
        {
          type: 'paragraph',
          text: 'قد نستعين بجهات خارجية لتقديم خدمات الاستضافة والتخزين السحابي والدعم الفني ومعالجة المدفوعات والتحقق من الهوية وإرسال الإشعارات والتحليلات التقنية، وذلك بالقدر اللازم لتقديم الخدمات وبما يتوافق مع المتطلبات النظامية والعقود ذات الصلة.',
        },
        { type: 'subheading', text: 'ج. الجهات الرسمية' },
        {
          type: 'paragraph',
          text: 'قد نفصح عن البيانات إذا كان ذلك مطلوبًا بموجب الأنظمة أو بأمر من جهة مختصة، أو لحماية الحقوق المشروعة للمنصة والمستخدمين وفقًا لما يسمح به النظام.',
        },
        { type: 'subheading', text: 'د. المعاملات والنزاعات التجارية' },
        {
          type: 'paragraph',
          text: 'قد نشارك البيانات الضرورية مع الأطراف المعنية لمعالجة عمليات الدفع أو الاسترداد أو الشكاوى أو النزاعات المتعلقة بالطلبات، وفقًا لطبيعة الحالة والمتطلبات النظامية.',
        },
        {
          type: 'paragraph',
          text: 'نحرص على قصر مشاركة البيانات على الحد اللازم للغرض المحدد، واتخاذ التدابير المناسبة لحمايتها.',
        },
      ],
    },
  ],
  en: [
    {
      id: 'introduction',
      title: 'Introduction',
      blocks: [
        {
          type: 'paragraph',
          text: 'Welcome to Parts X, the online platform that connects car-parts suppliers with retailers and makes it easier to find and order products, request quotations and manage purchases, payments and invoices.',
        },
        {
          type: 'paragraph',
          text: 'Parts X respects user privacy and is committed to protecting the personal and business data collected through the website and its related services. This policy explains what data we collect, how we use, protect and share it, and the choices and rights users have over their data.',
        },
        {
          type: 'paragraph',
          text: 'By using the platform you acknowledge that you have read this privacy policy. This does not replace any separate consent that the law requires for processing specific data.',
        },
      ],
    },
    {
      id: 'scope',
      title: 'Scope of this policy',
      blocks: [
        {
          type: 'paragraph',
          text: 'This policy applies to all users of the Parts X platform, including:',
        },
        {
          type: 'list',
          items: [
            'Traders: who use the platform to search for and buy car parts and request quotations.',
            'Suppliers: who list their products, manage stock and prices, and receive orders and quotation requests.',
            'Business representatives: who create or manage accounts on behalf of companies and organisations.',
          ],
        },
      ],
    },
    {
      id: 'data-collected',
      title: 'Data we collect',
      blocks: [
        {
          type: 'paragraph',
          text: 'Depending on how you use the services, the platform may collect the following data:',
        },
        {
          type: 'list',
          items: [
            {
              text: 'a. Account and registration data',
              items: [
                'Full name.',
                'Email address.',
                'Phone number.',
                'Business or company name.',
                'Job title or role within the business.',
                'Login details and identity verification methods.',
                'Profile data, preferences and language.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'collection',
      title: 'How we collect data',
      blocks: [
        { type: 'paragraph', text: 'We collect data through the following means:' },
        {
          type: 'list',
          items: [
            'Data you provide directly when creating or updating your account.',
            'Data you enter when adding products, placing orders or submitting quotations.',
            'Data generated by your use of the platform and your transactions.',
            'Data you provide when contacting support or filing a complaint.',
            'Data we receive from service providers or related parties, where legally permitted and necessary to provide the service.',
          ],
        },
        {
          type: 'paragraph',
          text: 'We only collect data needed for the stated purposes and avoid asking for unnecessary information.',
        },
      ],
    },
    {
      id: 'usage',
      title: 'How we use data',
      blocks: [
        { type: 'paragraph', text: 'We use the data we collect for the following purposes:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Creating, verifying and managing accounts.',
            'Letting traders search for parts and view product details.',
            'Letting suppliers add products and manage prices and stock.',
            'Processing orders and quotation requests and managing offers.',
            'Coordinating supply, shipping and delivery.',
            'Managing payments, invoices, receipts and refunds.',
            'Sending order notifications, payment and shipping updates and account alerts.',
            'Providing technical support and handling complaints and disputes.',
            'Protecting the platform from fraud, unauthorised use and violations.',
            'Improving platform performance, user experience and services.',
            'Meeting legal, regulatory, accounting and tax obligations.',
            'Sending marketing messages and offers where there is a proper legal basis, with an option to unsubscribe where applicable.',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: 'Sharing data with third parties',
      blocks: [
        {
          type: 'paragraph',
          text: 'We do not sell users’ personal data. We may share necessary data in the following cases:',
        },
        { type: 'subheading', text: 'a. Between traders and suppliers' },
        {
          type: 'paragraph',
          text: 'Data needed to complete a transaction may be shared, such as product details, requested quantities, relevant delivery details and business information required for invoicing or fulfilment.',
        },
        { type: 'subheading', text: 'b. Service providers' },
        {
          type: 'paragraph',
          text: 'We may use third parties for hosting, cloud storage, support, payment processing, identity verification, notifications and technical analytics, only to the extent needed to provide the services and in line with legal requirements and contracts.',
        },
        { type: 'subheading', text: 'c. Authorities' },
        {
          type: 'paragraph',
          text: 'We may disclose data where required by law or by order of a competent authority, or to protect the legitimate rights of the platform and its users as permitted by law.',
        },
        { type: 'subheading', text: 'd. Transactions and disputes' },
        {
          type: 'paragraph',
          text: 'We may share necessary data with the parties involved to process payments, refunds, complaints or disputes about orders, depending on the case and legal requirements.',
        },
        {
          type: 'paragraph',
          text: 'We limit data sharing to what the stated purpose requires and take appropriate measures to protect it.',
        },
      ],
    },
  ],
  ur: [
    {
      id: 'introduction',
      title: 'تعارف',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts X میں خوش آمدید، یہ ایک آن لائن پلیٹ فارم ہے جو گاڑیوں کے اسپیئر پارٹس کے سپلائرز کو ریٹیل تاجروں سے جوڑنے، اور مصنوعات کی تلاش، آرڈر دینے، کوٹیشن کی درخواست کرنے نیز خریداری، ادائیگیوں اور انوائسز کے انتظام کو آسان بنانے میں مہارت رکھتا ہے۔',
        },
        {
          type: 'paragraph',
          text: 'Parts X صارفین کی رازداری کا احترام کرتا ہے اور ویب سائٹ اور اس سے منسلک خدمات کے ذریعے جمع کیے گئے ذاتی اور تجارتی ڈیٹا کے تحفظ کا پابند ہے۔ یہ پالیسی وضاحت کرتی ہے کہ ہم کس قسم کا ڈیٹا جمع کرتے ہیں، اسے کیسے استعمال، محفوظ اور شیئر کرتے ہیں، اور صارفین کو اپنے ڈیٹا کے حوالے سے کون سے اختیارات اور حقوق حاصل ہیں۔',
        },
        {
          type: 'paragraph',
          text: 'پلیٹ فارم استعمال کر کے آپ تسلیم کرتے ہیں کہ آپ نے یہ رازداری کی پالیسی پڑھ لی ہے۔ تاہم یہ کسی ایسی علیحدہ رضامندی کا متبادل نہیں ہے جو مخصوص ڈیٹا پر کارروائی کے لیے قانوناً درکار ہو۔',
        },
      ],
    },
    {
      id: 'scope',
      title: 'پالیسی کا دائرۂ کار',
      blocks: [
        {
          type: 'paragraph',
          text: 'یہ پالیسی Parts X پلیٹ فارم کے تمام صارفین پر لاگو ہوتی ہے، بشمول:',
        },
        {
          type: 'list',
          items: [
            'تاجر: جو گاڑیوں کے اسپیئر پارٹس تلاش کرنے، خریدنے اور کوٹیشن کی درخواست کرنے کے لیے پلیٹ فارم استعمال کرتے ہیں۔',
            'سپلائرز: جو اپنی مصنوعات پیش کرتے ہیں، اسٹاک اور قیمتوں کا انتظام کرتے ہیں، اور خریداری کے آرڈرز اور کوٹیشن کی درخواستیں وصول کرتے ہیں۔',
            'اداروں کے نمائندے: جو کمپنیوں اور اداروں کی جانب سے اکاؤنٹس بناتے ہیں یا ان کا انتظام کرتے ہیں۔',
          ],
        },
      ],
    },
    {
      id: 'data-collected',
      title: 'ہم کون سا ڈیٹا جمع کرتے ہیں',
      blocks: [
        {
          type: 'paragraph',
          text: 'یہ پالیسی Parts X پلیٹ فارم کے تمام صارفین پر لاگو ہوتی ہے، بشمول:',
        },
        {
          type: 'list',
          items: [
            'تاجر: جو گاڑیوں کے اسپیئر پارٹس تلاش کرنے، خریدنے اور کوٹیشن کی درخواست کرنے کے لیے پلیٹ فارم استعمال کرتے ہیں۔',
            'سپلائرز: جو اپنی مصنوعات پیش کرتے ہیں، اسٹاک اور قیمتوں کا انتظام کرتے ہیں، اور خریداری کے آرڈرز اور کوٹیشن کی درخواستیں وصول کرتے ہیں۔',
            {
              text: 'الف۔ اکاؤنٹ اور رجسٹریشن کا ڈیٹا',
              items: [
                'پورا نام۔',
                'ای میل ایڈریس۔',
                'فون نمبر۔',
                'ادارے یا کمپنی کا نام۔',
                'ادارے میں صارف کا عہدہ یا حیثیت۔',
                'لاگ ان کی معلومات اور شناخت کی تصدیق کے ذرائع۔',
                'پروفائل ڈیٹا، ترجیحات اور زبان۔',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'collection',
      title: 'ڈیٹا کیسے جمع کیا جاتا ہے',
      blocks: [
        { type: 'paragraph', text: 'ہم درج ذیل ذرائع سے ڈیٹا جمع کرتے ہیں:' },
        {
          type: 'list',
          items: [
            'وہ ڈیٹا جو آپ اکاؤنٹ بناتے یا اپ ڈیٹ کرتے وقت براہِ راست فراہم کرتے ہیں۔',
            'وہ ڈیٹا جو آپ مصنوعات شامل کرتے، آرڈرز بناتے یا کوٹیشنز جمع کراتے وقت درج کرتے ہیں۔',
            'پلیٹ فارم کے استعمال اور لین دین کے نتیجے میں حاصل ہونے والا ڈیٹا۔',
            'وہ ڈیٹا جو آپ تکنیکی معاونت سے رابطہ کرتے یا شکایت درج کراتے وقت فراہم کرتے ہیں۔',
            'وہ ڈیٹا جو ہمیں سروس فراہم کنندگان یا متعلقہ اداروں سے موصول ہوتا ہے، جب ایسا کرنا قانوناً جائز اور سروس کی فراہمی کے لیے ضروری ہو۔',
          ],
        },
        {
          type: 'paragraph',
          text: 'ہم صرف مخصوص مقاصد کے لیے ضروری ڈیٹا جمع کرنے اور غیر ضروری معلومات طلب کرنے سے گریز کرنے کا خیال رکھتے ہیں۔',
        },
      ],
    },
    {
      id: 'usage',
      title: 'ڈیٹا کے استعمال کے مقاصد',
      blocks: [
        { type: 'paragraph', text: 'ہم جمع کردہ ڈیٹا کو درج ذیل مقاصد کے لیے استعمال کرتے ہیں:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'اکاؤنٹس بنانا، ان کی تصدیق کرنا اور ان کا انتظام کرنا۔',
            'تاجروں کو اسپیئر پارٹس تلاش کرنے اور مصنوعات کی تفصیلات دیکھنے کے قابل بنانا۔',
            'سپلائرز کو مصنوعات شامل کرنے اور قیمتوں اور اسٹاک کا انتظام کرنے کے قابل بنانا۔',
            'خریداری کے آرڈرز اور کوٹیشن کی درخواستوں پر کارروائی اور تجارتی پیشکشوں کا انتظام۔',
            'سپلائی، شپنگ اور ڈیلیوری کے عمل میں ہم آہنگی۔',
            'ادائیگیوں، انوائسز، رسیدوں اور رقم کی واپسی کا انتظام۔',
            'آرڈرز کی اطلاعات، ادائیگی اور شپنگ کی تازہ ترین معلومات اور اکاؤنٹ سے متعلق انتباہات بھیجنا۔',
            'تکنیکی معاونت فراہم کرنا اور شکایات و تنازعات کا ازالہ کرنا۔',
            'پلیٹ فارم کو دھوکہ دہی، غیر مجاز استعمال اور خلافِ ضابطہ سرگرمیوں سے محفوظ رکھنا۔',
            'پلیٹ فارم کی کارکردگی اور صارف کے تجربے کو بہتر بنانا اور خدمات کو ترقی دینا۔',
            'قانونی، ضابطہ جاتی، حسابی اور ٹیکس سے متعلق ذمہ داریوں کی تکمیل۔',
            'مناسب قانونی بنیاد موجود ہونے پر مارکیٹنگ پیغامات اور تجارتی پیشکشیں بھیجنا، اور جہاں لاگو ہو وہاں سبسکرپشن ختم کرنے کا اختیار دینا۔',
          ],
        },
      ],
    },
    {
      id: 'sharing',
      title: 'دیگر فریقوں کے ساتھ ڈیٹا کا اشتراک',
      blocks: [
        {
          type: 'paragraph',
          text: 'ہم صارفین کا ذاتی ڈیٹا دیگر فریقوں کو فروخت نہیں کرتے۔ تاہم درج ذیل صورتوں میں ہم ضروری ڈیٹا شیئر کر سکتے ہیں:',
        },
        { type: 'subheading', text: 'الف۔ تاجروں اور سپلائرز کے درمیان' },
        {
          type: 'paragraph',
          text: 'تجارتی لین دین کی تکمیل کے لیے ضروری ڈیٹا شیئر کیا جا سکتا ہے، جیسے مصنوعات کی تفصیلات، مطلوبہ مقدار، متعلقہ ڈیلیوری کی معلومات، اور انوائس جاری کرنے یا آرڈر پر عمل درآمد کے لیے درکار ادارے کی معلومات۔',
        },
        { type: 'subheading', text: 'ب۔ سروس فراہم کنندگان' },
        {
          type: 'paragraph',
          text: 'ہم ہوسٹنگ، کلاؤڈ اسٹوریج، تکنیکی معاونت، ادائیگیوں کی پروسیسنگ، شناخت کی تصدیق، اطلاعات بھیجنے اور تکنیکی تجزیات کی خدمات کے لیے بیرونی اداروں کی مدد لے سکتے ہیں، اور یہ صرف خدمات کی فراہمی کے لیے ضروری حد تک اور قانونی تقاضوں اور متعلقہ معاہدوں کے مطابق ہوگا۔',
        },
        { type: 'subheading', text: 'ج۔ سرکاری ادارے' },
        {
          type: 'paragraph',
          text: 'اگر قوانین کے تحت یا کسی مجاز ادارے کے حکم پر ضروری ہو، یا قانون کی اجازت کے مطابق پلیٹ فارم اور صارفین کے جائز حقوق کے تحفظ کے لیے ضروری ہو، تو ہم ڈیٹا ظاہر کر سکتے ہیں۔',
        },
        { type: 'subheading', text: 'د۔ تجارتی لین دین اور تنازعات' },
        {
          type: 'paragraph',
          text: 'معاملے کی نوعیت اور قانونی تقاضوں کے مطابق، ہم آرڈرز سے متعلق ادائیگی، رقم کی واپسی، شکایات یا تنازعات کے حل کے لیے متعلقہ فریقوں کے ساتھ ضروری ڈیٹا شیئر کر سکتے ہیں۔',
        },
        {
          type: 'paragraph',
          text: 'ہم ڈیٹا کے اشتراک کو مخصوص مقصد کے لیے ضروری حد تک محدود رکھنے اور اس کے تحفظ کے لیے مناسب اقدامات کرنے کا خیال رکھتے ہیں۔',
        },
      ],
    },
  ],
}

/** Terms and conditions copy from the Figma terms page (455:7346). */
export const termsAndConditions: Record<AppLocale, LegalSection[]> = {
  ar: [
    {
      id: 'introduction',
      title: 'مقدمة',
      blocks: [
        {
          type: 'paragraph',
          text: 'مرحبًا بك في منصة **Parts X**، المنصة المتخصصة في ربط موردي وتجار قطع غيار السيارات، وتسهيل عمليات البحث عن المنتجات وطلبها وتبادل عروض الأسعار وإتمام المعاملات التجارية.',
        },
        {
          type: 'paragraph',
          text: 'يُرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام المنصة أو إنشاء حساب. إن تسجيلك أو استخدامك لأي من خدمات Parts X يعني موافقتك على الالتزام بجميع البنود الواردة في هذه الوثيقة.',
        },
      ],
    },
    {
      id: 'definitions',
      title: 'التعريفات',
      blocks: [
        {
          type: 'paragraph',
          text: 'لأغراض هذه الشروط، يكون للمصطلحات التالية المعاني الموضحة أمام كل منها:',
        },
        {
          type: 'list',
          items: [
            '**المنصة:** Parts X، وتشمل الموقع الإلكتروني والتطبيق والخدمات الرقمية المرتبطة بهما.',
            '**المستخدم:** أي شخص أو منشأة تقوم باستخدام المنصة.',
            '**التاجر:** المستخدم الذي يبحث عن قطع الغيار ويقوم بطلبها من الموردين.',
            '**المورد:** الشخص أو المنشأة التي تعرض قطع غيار السيارات وتقدم عروض الأسعار من خلال المنصة.',
            '**الحساب:** الحساب الإلكتروني الذي يتم إنشاؤه للوصول إلى خدمات المنصة.',
            '**الطلب:** طلب شراء يقدمه التاجر للحصول على منتج أو مجموعة من المنتجات.',
          ],
        },
      ],
    },
    {
      id: 'registration',
      title: 'شروط التسجيل وإنشاء الحساب',
      blocks: [
        {
          type: 'paragraph',
          text: 'للاستفادة من خدمات Parts X، يجب على المستخدم الالتزام بما يلي:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'تقديم بيانات صحيحة ودقيقة وكاملة عند التسجيل.',
            'أن يكون المستخدم مؤهلًا قانونيًا لممارسة النشاط التجاري أو استخدام المنصة.',
            'استخدام الحساب للأغراض التجارية المشروعة فقط.',
            'المحافظة على سرية بيانات تسجيل الدخول وعدم مشاركتها مع الآخرين.',
            'تحديث بيانات الحساب عند حدوث أي تغيير عليها.',
            'عدم إنشاء حسابات متعددة بهدف التحايل على سياسات المنصة.',
          ],
        },
        {
          type: 'paragraph',
          text: 'يحق لإدارة Parts X طلب مستندات إضافية للتحقق من هوية المستخدم أو نشاطه التجاري قبل تفعيل الحساب أو استمرار استخدامه.',
        },
      ],
    },
    {
      id: 'platform-use',
      title: 'استخدام المنصة',
      blocks: [
        {
          type: 'paragraph',
          text: 'تتيح Parts X للمستخدمين مجموعة من الخدمات، تشمل:',
        },
        {
          type: 'list',
          items: [
            'البحث عن قطع غيار السيارات باستخدام الاسم أو رقم القطعة أو الوصف.',
            'استعراض المنتجات المتاحة لدى الموردين.',
            'إرسال طلبات شراء للموردين.',
            'استقبال عروض الأسعار ومقارنتها.',
            'إضافة المنتجات وإدارة الكتالوج الخاص بالمورد.',
            'إدارة الطلبات ومتابعة حالتها.',
            'الاستفادة من خدمات المنصة الأخرى التي يتم توفيرها مستقبلًا.',
          ],
        },
        {
          type: 'paragraph',
          text: 'يلتزم جميع المستخدمين باستخدام هذه الخدمات بطريقة قانونية ومهنية، وعدم إساءة استخدامها أو استغلالها للإضرار بالمستخدمين الآخرين.',
        },
      ],
    },
    {
      id: 'trader-obligations',
      title: 'التزام التجار',
      blocks: [
        {
          type: 'paragraph',
          text: 'يلتزم التاجر عند استخدام المنصة بما يلي:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'التأكد من صحة بيانات الطلبات والكميات المطلوبة.',
            'مراجعة مواصفات المنتجات وأرقام القطع قبل تأكيد الطلب.',
            'الالتزام بالأسعار وشروط الشراء التي يوافق عليها.',
            'عدم تقديم طلبات وهمية أو غير جادة.',
            'التواصل مع الموردين بطريقة مهنية ومحترمة.',
            'الالتزام بشروط الدفع والاستلام المتفق عليها مع المورد.',
            'إبلاغ المورد والمنصة في حال وجود مشكلة تتعلق بالطلب.',
          ],
        },
      ],
    },
    {
      id: 'supplier-obligations',
      title: 'التزام الموردين',
      blocks: [
        {
          type: 'paragraph',
          text: 'يلتزم المورد المسجل على Parts X بما يلي:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'تقديم بيانات صحيحة عن المنتجات المعروضة.',
            'التأكد من دقة أرقام القطع والمواصفات الفنية والصور.',
            'تحديث الأسعار والكميات المتاحة بصورة مستمرة.',
            'تقديم عروض أسعار واضحة تتضمن السعر والكمية وأي شروط إضافية.',
            'الالتزام بالعروض والأسعار التي يتم تأكيدها مع التاجر.',
            'توضيح حالة المنتجات، سواء كانت جديدة أو مستعملة أو مجددة، متى كان ذلك منطبقًا.',
            'الالتزام بمواعيد التجهيز والشحن المتفق عليها.',
            'عدم عرض منتجات مقلدة أو مسروقة أو غير مصرح بتداولها.',
          ],
        },
      ],
    },
    {
      id: 'products-pricing',
      title: 'المنتجات والأسعار وعروض الأسعار',
      blocks: [
        {
          type: 'list',
          items: [
            'يتحمل المورد مسؤولية صحة المعلومات المتعلقة بالمنتجات التي يعرضها.',
            'قد تختلف الأسعار والكميات المتاحة من مورد إلى آخر.',
            'لا يُعد عرض المنتج على المنصة تأكيدًا نهائيًا لتوفره لدى المورد.',
            'تخضع الأسعار النهائية للتأكيد والاتفاق بين التاجر والمورد.',
            'يجب أن تكون عروض الأسعار واضحة ومحددة المدة متى تم تحديد مدة صلاحية لها.',
            'لا تتحمل Parts X مسؤولية أي اختلاف في بيانات المنتجات أو الأسعار ناتج عن معلومات غير صحيحة قدمها المورد.',
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'introduction',
      title: 'Introduction',
      blocks: [
        {
          type: 'paragraph',
          text: 'Welcome to **Parts X**, the platform that connects car-parts suppliers and traders and makes it easier to find and order products, exchange quotations and complete business transactions.',
        },
        {
          type: 'paragraph',
          text: 'Please read these terms and conditions carefully before using the platform or creating an account. Registering for or using any Parts X service means you agree to every clause in this document.',
        },
      ],
    },
    {
      id: 'definitions',
      title: 'Definitions',
      blocks: [
        {
          type: 'paragraph',
          text: 'For the purposes of these terms, the following words have the meanings given next to them:',
        },
        {
          type: 'list',
          items: [
            '**Platform:** Parts X, including the website, the app and the related digital services.',
            '**User:** any person or business that uses the platform.',
            '**Trader:** a user who searches for spare parts and orders them from suppliers.',
            '**Supplier:** a person or business that offers car parts and sends quotations through the platform.',
            '**Account:** the online account created to access the platform services.',
            '**Order:** a purchase request a trader places for one or more products.',
          ],
        },
      ],
    },
    {
      id: 'registration',
      title: 'Registration and account',
      blocks: [
        {
          type: 'paragraph',
          text: 'To use Parts X services, a user must:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Provide accurate, correct and complete information when registering.',
            'Be legally qualified to carry out business or use the platform.',
            'Use the account for lawful business purposes only.',
            'Keep login details confidential and not share them with others.',
            'Update the account details whenever they change.',
            'Not create multiple accounts to get around platform policies.',
          ],
        },
        {
          type: 'paragraph',
          text: "Parts X may request additional documents to verify a user's identity or business before activating an account or allowing its continued use.",
        },
      ],
    },
    {
      id: 'platform-use',
      title: 'Using the platform',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts X offers users a range of services, including:',
        },
        {
          type: 'list',
          items: [
            'Searching for car parts by name, part number or description.',
            'Browsing the products suppliers have available.',
            'Sending purchase orders to suppliers.',
            'Receiving and comparing quotations.',
            'Adding products and managing a supplier catalogue.',
            'Managing orders and tracking their status.',
            'Using other platform services made available in the future.',
          ],
        },
        {
          type: 'paragraph',
          text: 'All users must use these services lawfully and professionally, and must not misuse them or use them to harm other users.',
        },
      ],
    },
    {
      id: 'trader-obligations',
      title: 'Trader obligations',
      blocks: [
        {
          type: 'paragraph',
          text: 'When using the platform, a trader must:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Check that order details and requested quantities are correct.',
            'Review product specifications and part numbers before confirming an order.',
            'Honour the prices and purchase terms they agree to.',
            'Not place fake or non-serious orders.',
            'Communicate with suppliers professionally and respectfully.',
            'Follow the payment and delivery terms agreed with the supplier.',
            'Tell the supplier and the platform about any problem with an order.',
          ],
        },
      ],
    },
    {
      id: 'supplier-obligations',
      title: 'Supplier obligations',
      blocks: [
        {
          type: 'paragraph',
          text: 'A supplier registered on Parts X must:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Provide accurate information about the products offered.',
            'Make sure part numbers, technical specifications and photos are accurate.',
            'Keep prices and available quantities up to date.',
            'Send clear quotations that state the price, quantity and any extra conditions.',
            'Honour the offers and prices confirmed with the trader.',
            'State whether products are new, used or refurbished where relevant.',
            'Meet the agreed preparation and shipping times.',
            'Not offer counterfeit, stolen or unauthorised products.',
          ],
        },
      ],
    },
    {
      id: 'products-pricing',
      title: 'Products, prices and quotations',
      blocks: [
        {
          type: 'list',
          items: [
            'The supplier is responsible for the accuracy of the product information they publish.',
            'Prices and available quantities may differ from one supplier to another.',
            'Listing a product on the platform does not confirm that the supplier has it in stock.',
            'Final prices are subject to confirmation and agreement between the trader and the supplier.',
            'Quotations must be clear and, when a validity period is set, time-limited.',
            'Parts X is not responsible for differences in product details or prices caused by incorrect information provided by the supplier.',
          ],
        },
      ],
    },
  ],
  ur: [
    {
      id: 'introduction',
      title: 'تعارف',
      blocks: [
        {
          type: 'paragraph',
          text: '**Parts X** پلیٹ فارم میں خوش آمدید، یہ گاڑیوں کے اسپیئر پارٹس کے سپلائرز اور تاجروں کو آپس میں جوڑنے، اور مصنوعات کی تلاش، آرڈر دینے، کوٹیشنز کے تبادلے اور تجارتی لین دین کی تکمیل کو آسان بنانے والا خصوصی پلیٹ فارم ہے۔',
        },
        {
          type: 'paragraph',
          text: 'پلیٹ فارم استعمال کرنے یا اکاؤنٹ بنانے سے پہلے براہِ کرم ان شرائط و ضوابط کو غور سے پڑھیں۔ Parts X کی کسی بھی سروس کے لیے آپ کی رجسٹریشن یا اس کا استعمال اس بات کا اظہار ہے کہ آپ اس دستاویز میں درج تمام شقوں کی پابندی پر رضامند ہیں۔',
        },
      ],
    },
    {
      id: 'definitions',
      title: 'تعریفات',
      blocks: [
        {
          type: 'paragraph',
          text: 'ان شرائط کے مقاصد کے لیے، درج ذیل اصطلاحات کے وہی معنی ہوں گے جو ہر ایک کے سامنے بیان کیے گئے ہیں:',
        },
        {
          type: 'list',
          items: [
            '**پلیٹ فارم:** Parts X، جس میں ویب سائٹ، ایپ اور ان سے منسلک ڈیجیٹل خدمات شامل ہیں۔',
            '**صارف:** کوئی بھی شخص یا ادارہ جو پلیٹ فارم استعمال کرتا ہے۔',
            '**تاجر:** وہ صارف جو اسپیئر پارٹس تلاش کرتا ہے اور سپلائرز سے انہیں آرڈر کرتا ہے۔',
            '**سپلائر:** وہ شخص یا ادارہ جو پلیٹ فارم کے ذریعے گاڑیوں کے اسپیئر پارٹس پیش کرتا ہے اور کوٹیشنز فراہم کرتا ہے۔',
            '**اکاؤنٹ:** پلیٹ فارم کی خدمات تک رسائی کے لیے بنایا گیا الیکٹرانک اکاؤنٹ۔',
            '**آرڈر:** خریداری کی وہ درخواست جو تاجر کسی پروڈکٹ یا مصنوعات کے مجموعے کے حصول کے لیے جمع کراتا ہے۔',
          ],
        },
      ],
    },
    {
      id: 'registration',
      title: 'رجسٹریشن اور اکاؤنٹ بنانے کی شرائط',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts X کی خدمات سے فائدہ اٹھانے کے لیے صارف پر درج ذیل کی پابندی لازم ہے:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'رجسٹریشن کے وقت درست، صحیح اور مکمل معلومات فراہم کرنا۔',
            'صارف کا تجارتی سرگرمی انجام دینے یا پلیٹ فارم استعمال کرنے کے لیے قانونی طور پر اہل ہونا۔',
            'اکاؤنٹ کو صرف جائز تجارتی مقاصد کے لیے استعمال کرنا۔',
            'لاگ ان کی معلومات کو خفیہ رکھنا اور دوسروں کے ساتھ شیئر نہ کرنا۔',
            'اکاؤنٹ کی معلومات میں کسی بھی تبدیلی کی صورت میں انہیں اپ ڈیٹ کرنا۔',
            'پلیٹ فارم کی پالیسیوں سے بچنے کے لیے متعدد اکاؤنٹس نہ بنانا۔',
          ],
        },
        {
          type: 'paragraph',
          text: 'Parts X کی انتظامیہ کو حق حاصل ہے کہ وہ اکاؤنٹ فعال کرنے یا اس کا استعمال جاری رکھنے سے پہلے صارف کی شناخت یا تجارتی سرگرمی کی تصدیق کے لیے اضافی دستاویزات طلب کرے۔',
        },
      ],
    },
    {
      id: 'platform-use',
      title: 'پلیٹ فارم کا استعمال',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts X صارفین کو متعدد خدمات فراہم کرتا ہے، جن میں شامل ہیں:',
        },
        {
          type: 'list',
          items: [
            'نام، پارٹ نمبر یا تفصیل کے ذریعے گاڑیوں کے اسپیئر پارٹس کی تلاش۔',
            'سپلائرز کے پاس دستیاب مصنوعات دیکھنا۔',
            'سپلائرز کو خریداری کے آرڈرز بھیجنا۔',
            'کوٹیشنز وصول کرنا اور ان کا موازنہ کرنا۔',
            'مصنوعات شامل کرنا اور سپلائر کے کیٹلاگ کا انتظام کرنا۔',
            'آرڈرز کا انتظام کرنا اور ان کی صورتِ حال پر نظر رکھنا۔',
            'مستقبل میں فراہم کی جانے والی پلیٹ فارم کی دیگر خدمات سے استفادہ کرنا۔',
          ],
        },
        {
          type: 'paragraph',
          text: 'تمام صارفین ان خدمات کو قانونی اور پیشہ ورانہ انداز میں استعمال کرنے کے پابند ہیں، اور دوسرے صارفین کو نقصان پہنچانے کے لیے ان کا غلط استعمال یا استحصال نہیں کریں گے۔',
        },
      ],
    },
    {
      id: 'trader-obligations',
      title: 'تاجروں کی ذمہ داریاں',
      blocks: [
        {
          type: 'paragraph',
          text: 'پلیٹ فارم استعمال کرتے وقت تاجر درج ذیل کا پابند ہے:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'آرڈرز کی معلومات اور مطلوبہ مقدار کی درستگی یقینی بنانا۔',
            'آرڈر کی تصدیق سے پہلے مصنوعات کی تفصیلات اور پارٹ نمبرز کا جائزہ لینا۔',
            'منظور کردہ قیمتوں اور خریداری کی شرائط کی پابندی کرنا۔',
            'جعلی یا غیر سنجیدہ آرڈرز نہ دینا۔',
            'سپلائرز کے ساتھ پیشہ ورانہ اور باوقار انداز میں رابطہ رکھنا۔',
            'سپلائر کے ساتھ طے شدہ ادائیگی اور وصولی کی شرائط کی پابندی کرنا۔',
            'آرڈر سے متعلق کسی مسئلے کی صورت میں سپلائر اور پلیٹ فارم کو مطلع کرنا۔',
          ],
        },
      ],
    },
    {
      id: 'supplier-obligations',
      title: 'سپلائرز کی ذمہ داریاں',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts X پر رجسٹرڈ سپلائر درج ذیل کا پابند ہے:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'پیش کردہ مصنوعات کے بارے میں درست معلومات فراہم کرنا۔',
            'پارٹ نمبرز، تکنیکی تفصیلات اور تصاویر کی درستگی یقینی بنانا۔',
            'قیمتوں اور دستیاب مقدار کو مسلسل اپ ڈیٹ کرنا۔',
            'واضح کوٹیشنز فراہم کرنا جن میں قیمت، مقدار اور کوئی بھی اضافی شرائط شامل ہوں۔',
            'تاجر کے ساتھ تصدیق شدہ پیشکشوں اور قیمتوں کی پابندی کرنا۔',
            'جہاں لاگو ہو، مصنوعات کی حالت واضح کرنا، خواہ وہ نئی ہوں، استعمال شدہ ہوں یا ری کنڈیشنڈ۔',
            'طے شدہ تیاری اور شپنگ کے اوقات کی پابندی کرنا۔',
            'جعلی، چوری شدہ یا غیر مجاز مصنوعات پیش نہ کرنا۔',
          ],
        },
      ],
    },
    {
      id: 'products-pricing',
      title: 'مصنوعات، قیمتیں اور کوٹیشنز',
      blocks: [
        {
          type: 'list',
          items: [
            'سپلائر اپنی پیش کردہ مصنوعات سے متعلق معلومات کی درستگی کا ذمہ دار ہے۔',
            'قیمتیں اور دستیاب مقدار ایک سپلائر سے دوسرے سپلائر میں مختلف ہو سکتی ہیں۔',
            'پلیٹ فارم پر کسی پروڈکٹ کا دکھایا جانا سپلائر کے پاس اس کی دستیابی کی حتمی تصدیق نہیں ہے۔',
            'حتمی قیمتیں تاجر اور سپلائر کے درمیان تصدیق اور اتفاق سے مشروط ہیں۔',
            'کوٹیشنز واضح ہونی چاہئیں، اور اگر ان کی میعاد مقرر کی گئی ہو تو ان کی مدت متعین ہونی چاہیے۔',
            'سپلائر کی فراہم کردہ غلط معلومات کے نتیجے میں مصنوعات کی تفصیلات یا قیمتوں میں کسی فرق کی ذمہ داری Parts X پر نہیں ہوگی۔',
          ],
        },
      ],
    },
  ],
}
