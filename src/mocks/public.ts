/**
 * Mock content for the public pages during the UI phase. Legal texts and contact details move to
 * the backend (CMS/settings) once the API is wired.
 */
import type { AppLocale } from '@/plugins/i18n'
import type { PartOrigin } from '@/types/catalog'

/* ------------------------------------------------------------------ Landing */

export const landingStats = [
  { key: 'parts', value: '+50.000' },
  { key: 'categories', value: '14' },
  { key: 'brands', value: '22' },
  { key: 'carMakes', value: '24' },
] as const

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
          text: 'مرحبًا بك في Auto X، المنصة الإلكترونية المتخصصة في ربط موردي قطع غيار السيارات بتجار التجزئة، وتسهيل البحث عن المنتجات وطلبها وطلب عروض الأسعار وإدارة عمليات الشراء والمدفوعات والفواتير.',
        },
        {
          type: 'paragraph',
          text: 'تحترم Auto X خصوصية المستخدمين وتلتزم بحماية البيانات الشخصية والتجارية التي يتم جمعها من خلال الموقع والخدمات المرتبطة به. توضح هذه السياسة أنواع البيانات التي نجمعها، وكيفية استخدامها وحمايتها ومشاركتها، والخيارات والحقوق المتاحة للمستخدمين بشأن بياناتهم.',
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
        { type: 'paragraph', text: 'تسري هذه السياسة على جميع مستخدمي منصة Auto X، بما في ذلك:' },
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
        { type: 'paragraph', text: 'تسري هذه السياسة على جميع مستخدمي منصة Auto X، بما في ذلك:' },
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
          text: 'Welcome to Auto X, the online platform that connects car-parts suppliers with retailers and makes it easier to find and order products, request quotations and manage purchases, payments and invoices.',
        },
        {
          type: 'paragraph',
          text: 'Auto X respects user privacy and is committed to protecting the personal and business data collected through the website and its related services. This policy explains what data we collect, how we use, protect and share it, and the choices and rights users have over their data.',
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
          text: 'This policy applies to all users of the Auto X platform, including:',
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
}

/** The Figma terms page has no body copy yet; these placeholder sections show the layout. */
export const termsAndConditions: Record<AppLocale, LegalSection[]> = {
  ar: [
    {
      id: 'acceptance',
      title: 'قبول الشروط',
      blocks: [
        {
          type: 'paragraph',
          text: 'باستخدامك منصة Auto X فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق عليها، يرجى عدم استخدام المنصة.',
        },
      ],
    },
    {
      id: 'accounts',
      title: 'الحسابات',
      blocks: [
        {
          type: 'list',
          items: [
            'يلتزم المستخدم بتقديم بيانات صحيحة ومحدثة عند التسجيل.',
            'المستخدم مسؤول عن الحفاظ على سرية بيانات الدخول الخاصة بحسابه.',
            'يحق للمنصة تعليق أي حساب يخالف هذه الشروط.',
          ],
        },
      ],
    },
    {
      id: 'orders',
      title: 'الطلبات والمدفوعات',
      blocks: [
        {
          type: 'paragraph',
          text: 'تخضع الطلبات لتوفر القطع لدى الموردين، وتُعرض الأسعار شاملة أو غير شاملة لضريبة القيمة المضافة حسب ما هو موضح في صفحة الطلب.',
        },
      ],
    },
    {
      id: 'returns',
      title: 'الاسترجاع',
      blocks: [
        {
          type: 'paragraph',
          text: 'يمكن طلب استرجاع القطع خلال 7 أيام من تاريخ الاستلام وفقًا لسياسة الاسترجاع المعتمدة في المنصة.',
        },
      ],
    },
  ],
  en: [
    {
      id: 'acceptance',
      title: 'Accepting the terms',
      blocks: [
        {
          type: 'paragraph',
          text: 'By using the Auto X platform you agree to these terms and conditions. If you do not agree, please do not use the platform.',
        },
      ],
    },
    {
      id: 'accounts',
      title: 'Accounts',
      blocks: [
        {
          type: 'list',
          items: [
            'Users must provide accurate, up-to-date information when registering.',
            'Users are responsible for keeping their login details confidential.',
            'The platform may suspend any account that breaches these terms.',
          ],
        },
      ],
    },
    {
      id: 'orders',
      title: 'Orders and payments',
      blocks: [
        {
          type: 'paragraph',
          text: 'Orders depend on parts being available from suppliers. Prices are shown including or excluding VAT as stated on the order page.',
        },
      ],
    },
    {
      id: 'returns',
      title: 'Returns',
      blocks: [
        {
          type: 'paragraph',
          text: 'Parts can be returned within 7 days of delivery under the platform’s return policy.',
        },
      ],
    },
  ],
}

/* ------------------------------------------------------------- Excel search */

/** Supplier columns shown in the Excel results table, in display order. */
export const excelOfferColumns: Array<{ key: string; origin: PartOrigin | 'mobis' }> = [
  { key: 'original', origin: 'original' },
  { key: 'mobis', origin: 'mobis' },
  { key: 'korean', origin: 'korean' },
  { key: 'chinese', origin: 'chinese' },
]

export interface ExcelOffer {
  id: string
  price: number
  stock: number
  supplier: string
  badge?: 'cheapest' | 'matches'
}

export interface ExcelResultRow {
  id: string
  partNumber: string
  description: string
  requestedQuantity: number
  /** Offers keyed by column key; a missing key renders an empty cell. */
  offers: Partial<Record<string, ExcelOffer>>
}

function offer(id: string, price: number, badge?: ExcelOffer['badge']): ExcelOffer {
  return { id, price, stock: 20, supplier: 'الشركة رقم 8', badge }
}

export const excelResults: ExcelResultRow[] = [
  {
    id: 'row-1',
    partNumber: '54500AA100',
    description: 'مقص امامي يسار النترا 2020',
    requestedQuantity: 2,
    offers: {
      original: offer('o-1', 160, 'cheapest'),
      mobis: offer('o-2', 200, 'matches'),
      korean: offer('o-3', 190),
    },
  },
  {
    id: 'row-2',
    partNumber: '54500AA100',
    description: 'مقص امامي يسار النترا 2020',
    requestedQuantity: 2,
    offers: {
      original: offer('o-4', 160, 'cheapest'),
      korean: offer('o-5', 160, 'matches'),
    },
  },
  {
    id: 'row-3',
    partNumber: '54500AA100',
    description: 'مقص امامي يسار النترا 2020',
    requestedQuantity: 2,
    offers: {},
  },
]

/**
 * Mock search: one result row per searched part, reusing the design's offer rows in turn so each
 * state (offers, partial offers, unavailable) still shows up. Replaced by the API response later.
 */
export function mockExcelResultsFor(
  items: ReadonlyArray<{ partNumber: string; quantity: number }>,
): ExcelResultRow[] {
  return items.map((item, index) => {
    const template = excelResults[index % excelResults.length]!
    return {
      ...template,
      id: `search-${index}`,
      partNumber: item.partNumber,
      requestedQuantity: item.quantity,
    }
  })
}
