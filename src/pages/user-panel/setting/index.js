import {Col} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {FileUploader} from "react-drag-drop-files";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import {Alert, Breadcrumbs, Button, Skeleton} from "@mui/material";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import {useRouter} from "next/router";
import axios from "axios";
import Nprogress from "nprogress";


export default function EditCompany() {

    const [data, setData]= useState({})
    const [getData , setGetData] = useState(false)
    const dataFetch = async () => {
        const res = await fetch(`${process.env.LOCAL_URL}/api/user-panel/company/${localStorage.getItem("selectedCompany")}`)
        const data = await res.json()
        setData(data)
    }
    useEffect(()=>{
        dataFetch()
    },[getData])
    const breadcrumbs = [
        <Typography key="3" color="text.primary" className={"color-my-purple"}>
            ویرایش اکانت شرکت
        </Typography>,
    ];
    const router = useRouter()

    const [statusOptions] = useState([
        {
            label: "غیر فعال",
            value: 0
        },
        {
            label: "فعال",
            value: 1
        }
    ])
    const [linkTypeList] = useState([
        {
            label : "تالار عروسی",
            value : "تالار عروسی"
        },
        {
            label : "باغ تالار عروسی",
            value : "باغ تالار عروسی"
        },
        {
            label : "سالن عقد",
            value : "سالن عقد"
        },
        {
            label : "آتلیه فیلم و عکس",
            value : "آتلیه فیلم و عکس"
        },
        {
            label : "آرایشگاه و زیبایی",
            value : "آرایشگاه و زیبایی"
        },
        {
            label : "تشریفات مجالس",
            value : "تشریفات مجالس"
        },
        {
            label : "مزون",
            value : "مزون"
        },
        {
            label : "سایر",
            value : "سایر"
        },
        // {
        //     label: "مراکز خرید، پاساژها و فروشگاه‌های زنجیره‌ای",
        //     value: "مراکز خرید، پاساژها و فروشگاه‌های زنجیره‌ای"
        // },
        // {
        //     label: "دانشگاه‌ها، مراکز آموزشی و کمک آموزشی و فرهنگسراها",
        //     value: "دانشگاه‌ها، مراکز آموزشی و کمک آموزشی و فرهنگسراها"
        // },
        // {
        //     label: "سفارتخانه‌ها و موسسات بین‌المللی",
        //     value: "سفارتخانه‌ها و موسسات بین‌المللی"
        // },
        // {
        //     label: "هتل‌ها، متل‌ها و مراکز اقامتی و گردشگری",
        //     value: "هتل‌ها، متل‌ها و مراکز اقامتی و گردشگری"
        // }, {
        //     label: "موزه‌ها، گالری‌ها، فرهنگسراها، کتابخانه‌ها و مراکز فرهنگی",
        //     value: "موزه‌ها، گالری‌ها، فرهنگسراها، کتابخانه‌ها و مراکز فرهنگی"
        // },
        // {
        //     label: "باشگاه‌ها و اماکن ورزشی",
        //     value: "باشگاه‌ها و اماکن ورزشی"
        // },
        // {
        //     label: "مراکز سرگرمی، تفریحی، شهربازی و اوقات فراغت",
        //     value: "مراکز سرگرمی، تفریحی، شهربازی و اوقات فراغت"
        // },
        // {
        //     label: "سایر مراکز و اماکن",
        //     value: "سایر مراکز و اماکن"
        // },
        // {
        //     label: "انتشارات، رسانه و کتاب",
        //     value: "انتشارات، رسانه و کتاب"
        // },
        // {
        //     label: "خدمات تبلیغات، بازاریابی و روابط عمومی",
        //     value: "خدمات تبلیغات، بازاریابی و روابط عمومی"
        // }, {
        //     label: "خدمات توریسم، گردشگری، مسافرتی، خطوط هوایی",
        //     value: "خدمات توریسم، گردشگری، مسافرتی، خطوط هوایی"
        // },
        // {
        //     label: "خدمات حقوقی و قانونی و وکالت",
        //     value: "خدمات حقوقی و قانونی و وکالت"
        // },
        // {
        //     label: "خدمات حمل و نقل (خدمات دریایی، هوایی، ریلی)",
        //     value: "خدمات حمل و نقل (خدمات دریایی، هوایی، ریلی)"
        // },
        // {
        //     label: "خدمات طراحی، معماری و دکوراسیون داخلی",
        //     value: "خدمات طراحی، معماری و دکوراسیون داخلی"
        // },
        // {
        //     label: "تشریفات و خدمات برگزاری رویداد و مراسم",
        //     value: "تشریفات و خدمات برگزاری رویداد و مراسم"
        // },
        // {
        //     label: "خدمات بازرگانی، صادرات، واردات و گمرکی",
        //     value: "خدمات بازرگانی، صادرات، واردات و گمرکی"
        // },
        //
        //
        // {
        //     label: "سایر فعالیت‌های خدماتی",
        //     value: "سایر فعالیت‌های خدماتی"
        // },
        // {
        //     label: "صنعت دارو، درمان و بهداشت، پزشکی، دندانپزشکی و بیمارستانی",
        //     value: "صنعت دارو، درمان و بهداشت، پزشکی، دندانپزشکی و بیمارستانی"
        // },
        // {
        //     label: "مواد شوینده، پاک کننده، بهداشتی و سلولزی",
        //     value: "مواد شوینده، پاک کننده، بهداشتی و سلولزی"
        // },
        // {
        //     label: "صنایع بالابرها، آسانسور، پله برقی",
        //     value: "صنایع بالابرها، آسانسور، پله برقی"
        // },
        // {
        //     label: "نفت، گاز، پالایش و پتروشیمی",
        //     value: "نفت، گاز، پالایش و پتروشیمی"
        // },
        // {
        //     label: "صنایع غذایی و آشامیدنی",
        //     value: "صنایع غذایی و آشامیدنی"
        // },
        // {
        //     label: "صنعت چوب، مبلمان، دکوراسیون، آشپزخانه و تجهیزات اداری",
        //     value: "صنعت چوب، مبلمان، دکوراسیون، آشپزخانه و تجهیزات اداری"
        // }, {
        //     label: "صنعت پلیمر، لاستیک، پلاستیک، رنگ، رزین و کامپوزیت",
        //     value: "صنعت پلیمر، لاستیک، پلاستیک، رنگ، رزین و کامپوزیت"
        // }, {
        //     label: "صنعت مخابرات، برق، الکترونیک، صوتی و تصویری",
        //     value: "صنعت مخابرات، برق، الکترونیک، صوتی و تصویری"
        // }, {
        //     label: "صنعت کاشی، سرامیک و چینی",
        //     value: "صنعت کاشی، سرامیک و چینی"
        // }, {
        //     label: "مسکن، ساخت و ساز و مصالح ساختمانی",
        //     value: "مسکن، ساخت و ساز و مصالح ساختمانی"
        // }, {
        //     label: "کشاورزی، دامداری و طیور",
        //     value: "کشاورزی، دامداری و طیور"
        // }, {
        //     label: "خودرو، موتورسیکلت، قطعه‌سازی و لوازم یدکی",
        //     value: "خودرو، موتورسیکلت، قطعه‌سازی و لوازم یدکی"
        // }, {
        //     label: "پوشاک، کیف و کفش، چرم",
        //     value: "پوشاک، کیف و کفش، چرم"
        // }, {
        //     label: "صنعت نساجی، فرش، موکت و کفپوش",
        //     value: "صنعت نساجی، فرش، موکت و کفپوش"
        // },
        // {
        //     label: "صنعت ارتباطات، فناوری اطلاعات و خدمات اینترنت",
        //     value: "صنعت ارتباطات، فناوری اطلاعات و خدمات اینترنت"
        // },
        // {
        //     label: "صنعت آب و فاضلاب و تاسیسات",
        //     value: "صنعت آب و فاضلاب و تاسیسات"
        // },
        // {
        //     label: "صنایع معدنی، ماشین آلات و تجهیزات وابسته",
        //     value: "صنایع معدنی، ماشین آلات و تجهیزات وابسته"
        // },
        // {
        //     label: "متالورژی، فولاد",
        //     value: "متالورژی، فولاد"
        // },
        // {
        //     label: "هوانوردی و هوا فضا",
        //     value: "هوانوردی و هوا فضا"
        // },
        // {
        //     label: "صنعت آرایشی و بهداشتی",
        //     value: "صنعت آرایشی و بهداشتی"
        // },
        // {
        //     label: "صنایع دستی و اقلام فرهنگی",
        //     value: "صنایع دستی و اقلام فرهنگی"
        // },
        // {
        //     label: "صنعت چاپ و بسته‌بندی",
        //     value: "صنعت چاپ و بسته‌بندی"
        // }, {
        //     label: "حمل و نقل زمینی، هوایی، دریایی و ریلی",
        //     value: "حمل و نقل زمینی، هوایی، دریایی و ریلی"
        // },
        // {
        //     label: "صنعت لوازم خانگی و تجیهزات آشپزخانه",
        //     value: "صنعت لوازم خانگی و تجیهزات آشپزخانه"
        // },
        // {
        //     label: "طلا، جواهر، نقره، زیورآلات ، ساعت و عینک",
        //     value: "طلا، جواهر، نقره، زیورآلات ، ساعت و عینک"
        // },
        // {
        //     label: "صنعت پخش و توزیع کالا و خدمات مرتبط",
        //     value: "صنعت پخش و توزیع کالا و خدمات مرتبط"
        // },
        // {
        //     label: "صنعت خرده‌فروشی، فروشگاه‌های زنجیره‌ای، فرانچایز و تجهیزات فروشگاهی",
        //     value: "صنعت خرده‌فروشی، فروشگاه‌های زنجیره‌ای، فرانچایز و تجهیزات فروشگاهی"
        // },
        // {
        //     label: "صنعت تجهیزات ایمنی، امنیتی، حفاظتی و اطفاء حریق",
        //     value: "صنعت تجهیزات ایمنی، امنیتی، حفاظتی و اطفاء حریق"
        // },
        // {
        //     label: "صنایع تبدیلی، بازیافت و محیط زیستی",
        //     value: "صنایع تبدیلی، بازیافت و محیط زیستی"
        // },
        // {
        //     label: "صنایع دیجیتال، رایانه و کامپیوتر، سخت افزار و نرم افزار",
        //     value: "صنایع دیجیتال، رایانه و کامپیوتر، سخت افزار و نرم افزار"
        // },
        // {
        //     label: "صنعت بورس، بانک، بانکداری، خدمات مالی و بیمه، کارگزاری بورس",
        //     value: "صنعت بورس، بانک، بانکداری، خدمات مالی و بیمه، کارگزاری بورس"
        // },
        // {
        //     label: "صنعت تجهیزات و دستگاه‌های ورزشی",
        //     value: "صنعت تجهیزات و دستگاه‌های ورزشی"
        // },
        // {
        //     label: "سایر صنایع",
        //     value: "سایر صنایع"
        // },
        // {
        //     label: "ماشین آلات و ابزارهای صنعت",
        //     value: "ماشین آلات و ابزارهای صنعت"
        // },
        // {
        //     label: "صنایع و خدمات مرتبط با تلفن‌های همراه ( موبایل)",
        //     value: "صنایع و خدمات مرتبط با تلفن‌های همراه ( موبایل)"
        // },
        // {
        //     label: "تجارت الکترونیک و خدمات مبتنی بر وب",
        //     value: "تجارت الکترونیک و خدمات مبتنی بر وب"
        // },
        // {
        //     label: "صنایع دانش‌بنیان و دارای فناوری پیشرفته همچون نانوتکنولوژی",
        //     value: "صنایع دانش‌بنیان و دارای فناوری پیشرفته همچون نانوتکنولوژی"
        // },
        // {
        //     label: "صنایع دیجیتال، رایانه و کامپیوتر، سخت افزار و نرم افزار",
        //     value: "صنایع دیجیتال، رایانه و کامپیوتر، سخت افزار و نرم افزار"
        // },
        // {
        //     label: "سایر صنایع مربوط به فناوری‌های پیشرفته",
        //     value: "سایر صنایع مربوط به فناوری‌های پیشرفته"
        // },
        // {
        //     label: "لوازم خانگی",
        //     value: "لوازم خانگی"
        // },
        // {
        //     label: "ابزار و یراق",
        //     value: "ابزار و یراق"
        // },
        // {
        //     label: "وزارتخانه‌ها، ارگان‌ها، نهادها و سازمان‌های دولتی و حکومتی",
        //     value: "وزارتخانه‌ها، ارگان‌ها، نهادها و سازمان‌های دولتی و حکومتی"
        // },
        // {
        //     label: "انجمن‌های علمی و تخصصی",
        //     value: "انجمن‌های علمی و تخصصی"
        // },
        // {
        //     label: "اتحادیه‌ها و انجمن‌های صنفی",
        //     value: "اتحادیه‌ها و انجمن‌های صنفی"
        // },
        // {
        //     label: "نهادها و انجمن‌های خیریه و غیرانتفاعی",
        //     value: "نهادها و انجمن‌های خیریه و غیرانتفاعی"
        // },
        // {
        //     label: "فدراسیون‌ها و تشکل‌های ورزشی",
        //     value: "فدراسیون‌ها و تشکل‌های ورزشی"
        // },
        // {
        //     label: "سایر نهادها، سازمان‌ها و انجمن‌ها",
        //     value: "سایر نهادها، سازمان‌ها و انجمن‌ها"
        // }
    ])
    const stateList = [
        {
            label: "آذربايجان شرقی",
            value: 1
        },
        {
            label: "آذربايجان غربی",
            value: 2
        },
        {
            label: "اردبيل",
            value: 3
        },
        {
            label: "اصفهان",
            value: 4
        },
        {
            label: "ايلام",
            value: 5
        },
        {
            label: "بوشهر",
            value: 6
        },
        {
            label: "تهران",
            value: 7
        },
        {
            label: "چهارمحال بختياری",
            value: 8
        },
        {
            label: "خراسان جنوبی",
            value: 9
        },
        {
            label: "خراسان رضوی",
            value: 10
        },
        {
            label: "خراسان شمالي",
            value: 11
        },
        {
            label: "خوزستان",
            value: 12
        },
        {
            label: "زنجان",
            value: 13
        },
        {
            label: "سمنان",
            value: 14
        },
        {
            label: "سيستان و بلوچستان",
            value: 15
        },
        {
            label: "فارس",
            value: 16
        },
        {
            label: "قزوين",
            value: 17
        },
        {
            label: "قم",
            value: 18
        },
        {
            label: "کرج",
            value: 19
        },
        {
            label: "كردستان",
            value: 20
        },
        {
            label: "كرمان",
            value: 21
        },
        {
            label: "كرمانشاه",
            value: 22
        },
        {
            label: "كهكيلويه و بويراحمد",
            value: 23
        },
        {
            label: "گلستان",
            value: 24
        },
        {
            label: "گيلان",
            value: 25
        },
        {
            label: "لرستان",
            value: 26
        },
        {
            label: "مازندران",
            value: 27
        },
        {
            label: "مركزی",
            value: 28
        },
        {
            label: "هرمزگان",
            value: 29
        },
        {
            label: "همدان",
            value: 30
        },
        {
            label: "يزد",
            value: 31
        },
    ]
    let cityList = {
        1: ["اسكو", "اهر", "ایلخچی", "باسمنج", "بستان آباد", "بناب", "تبريز", "تسوج", "جلفا", "خسروشهر", "سراب", "سهند", "شبستر", "صوفیان", "مراغه", "مرند", "ملكان", "ممقان", "ميانه", "هاديشهر", "هريس", "هشترود", "ورزقان"],
        2: ["اروميه", "اشنويه", "بوكان", "تكاب", "خوي", "سر دشت", "سلماس", "شاهين دژ", "ماكو", "مهاباد", "مياندوآب", "نقده", "پلدشت", "پيرانشهر", "چالدران"],
        3: ["اردبيل", "خلخال", "مشگين شهر", "نمين", "نير", "پارس آباد", "گرمي"],
        4: ["آران و بيدگل", "اردستان", "اصفهان", "باغ بهادران", "تودشک", "تيران", "حاجي آباد", "خميني شهر", "خوانسار", "درچه", "دهاقان", "زرين شهر", "سميرم", "شهرضا", "عسگران", "علويجه", "فلاورجان", "كاشان", "مباركه", "نجف آباد", "نطنز", "ورزنه", "کوهپایه", "گلپايگان"],
        5: ["آبدانان", "ايلام", "ايوان", "دره شهر", "دهلران", "سرابله", "مهران"],
        6: ["اهرم", "برازجان", "بوشهر", "جم", "خورموج", "دير", "عسلویه", "كنگان", "کاکی", "گناوه"],
        7: ["اسلامشهر", "باقرشهر", "بومهن", "تجريش", "تهران", "دماوند", "رباط كريم", "رودهن", "ري", "شريف آباد", "شهريار", "فشم", "فيروزكوه", "قدس", "قرچك", "كهريزك", "لواسان", "ملارد", "ورامين", "پاكدشت", "چهاردانگه"],
        8: ["اردل", "بروجن", "شهركرد", "فارسان", "لردگان", "چلگرد"],
        9: ["بيرجند", "سربيشه", "فردوس", "قائن", "نهبندان"],
        10: ["تايباد", "تربت جام", "تربت حيدريه", "خواف", "درگز", "سبزوار", "سرخس", "طبس", "طرقبه", "فريمان", "قوچان", "كاشمر", "مشهد", "نيشابور", "چناران", "گناباد"],
        11: ["آشخانه", "اسفراين", "بجنورد", "جاجرم", "شيروان"],
        12: ["آبادان", "انديمشك", "اهواز", "ايذه", "ايرانشهر", "باغ ملك", "بندر امام خميني", "بندر ماهشهر", "بهبهان", "حمیدیه", "خرمشهر", "دزفول", "رامشیر", "رامهرمز", "سوسنگرد", "شادگان", "شادگان", "شوش", "شوشتر", "لالي", "مسجد سليمان", "ملاثانی", "هنديجان", "هويزه"],
        13: ["آب بر", "ابهر", "خدابنده", "خرمدره", "زنجان", "قيدار", "ماهنشان"],
        14: ["ايوانكي", "بسطام", "دامغان", "سمنان", "شاهرود", "گرمسار"],
        15: ["ايرانشهر", "خاش", "زابل", "زاهدان", "سراوان", "سرباز", "ميرجاوه", "چابهار"],
        16: ["آباده", "اردكان", "ارسنجان", "استهبان", "اقليد", "بوانات", "جهرم", "حاجي آباد", "خرامه", "خنج", "داراب", "زرقان", "سروستان", "سوريان", "سپيدان", "شيراز", "صفاشهر", "فراشبند", "فسا", "فيروز آباد", "كازرون", "لار", "لامرد", "مرودشت", "مهر", "کوار"],
        17: ["آبيك", "بوئين زهرا", "تاكستان", "قزوين"],
        18: ["قم"],
        19: ["اشتهارد", "طالقان", "كرج", "ماهدشت", "نظرآباد", "هشتگرد"],
        20: ["بانه", "بيجار", "حسن آباد", "سقز", "سنندج", "صلوات آباد", "قروه", "مريوان"],
        21: ["انار", "بافت", "بردسير", "بم", "جيرفت", "راور", "رفسنجان", "زرند", "سيرجان", "كرمان", "كهنوج", "کوهبنان"],
        22: ["اسلام آباد غرب", "جوانرود", "سنقر", "صحنه", "قصر شيرين", "كرمانشاه", "كنگاور", "هرسين", "پاوه"],
        23: ["دهدشت", "دوگنبدان", "سي سخت", "ياسوج", "گچساران"],
        24: ["آزاد شهر", "آق قلا", "راميان", "علي آباد كتول", "كردكوی", "كلاله", "گرگان", "گنبد كاووس"],
        25: ["آستارا", "املش", "تالش", "رشت", "رودبار", "شفت", "صومعه سرا", "فومن", "لاهیجان", "لنگرود", "ماسال", "ماسوله", "منجيل", "هشتپر"],
        26: ["ازنا", "الشتر", "اليگودرز", "بروجرد", "خرم آباد", "دزفول", "دورود", "كوهدشت", "ماهشهر", "نور آباد"],
        27: ["آمل", "بابل", "بابلسر", "بلده", "بهشهر", "تنكابن", "جويبار", "رامسر", "ساري", "قائم شهر", "محمود آباد", "نكا", "نور", "نوشهر", "چالوس"],
        28: ["آشتيان", "اراك", "تفرش", "خمين", "دليجان", "ساوه", "شازند", "محلات"],
        29: ["بستك", "بندر جاسك", "بندر خمیر", "بندر لنگه", "بندرعباس", "حاجي آباد", "دهبارز", "قشم", "قشم", "كيش", "ميناب"],
        30: ["اسدآباد", "بهار", "رزن", "ملاير", "نهاوند", "همدان"],
        31: ["ابركوه", "اردكان", "اشكذر", "بافق", "تفت", "خضرآباد", "زارچ", "طبس", "مهريز", "ميبد", "هرات", "يزد"]
    };

    // form input ---------------------------------------
    const [brandName, setBrandName] = useState("")
    const [brandNameError, setBrandNameError] = useState(false)
    const [companyName, setCompanyName] = useState("")
    const [companyNameError, setCompanyNameError] = useState(false)
    const [activityType, setActivityType] = useState("")
    const [activityTypeError, setActivityTypeError] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountNameError, setAccountNameError] = useState(false)
    const [desc, setDesc] = useState("")
    const [descError, setDescError] = useState(false)
    const [tel, setTel] = useState("")
    const [telError, setTelError] = useState(false)
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [cityError, setCityError] = useState(city === "لطفا استان را انتخاب کنید")
    const [selectedCityList, setSelectedCityList] = useState([])
    const [address, setAddress] = useState("")
    const [addressError, setAddressError] = useState(false)
    const [status, setStatus] = useState("")
    const [verifyStatus, setVerifyStatus] = useState()
    const [selectedStatus, setSelectedStatus] = useState("")
    const [stateLabel, setStateLabel] = useState("")
    useEffect(()=>{
        if (data.status){
            setBrandName(data.data.brand_name)
            setCompanyName(data.data.company_name)
            setActivityType(data.data.activity_type)
            setAccountName(data.data.title)
            setDesc(data.data.subtitle)
            setTel(data.data.phone)
            setState(stateList.find(item => item.label == data.data.state).value)
            setCity(data.data.city)
            setSelectedCityList(cityList[stateList.find(item => item.label == data.data.state).value])
            setAddress(data.data.address)
            setStatus(data.data.status)
            setVerifyStatus(data.data.verify_status)
            setSelectedStatus(data.data.selected_status)
        }
    },[data])
    useEffect(() => {
        if(data.status){
            setStateLabel(stateList.find(item => item.value == state).label)
        }
    }, [state])
    const brandNameHandler = (event) => {
        setBrandName(event.target.value)
        event.target.value.length >= 6 && event.target.value.length <= 40 ? setBrandNameError(false) : setBrandNameError(true)
    }
    const companyNameHandler = (event) => {
        setCompanyName(event.target.value)
        event.target.value.length >= 6 && event.target.value.length <= 40 ? setCompanyNameError(false) : setCompanyNameError(true)
    }
    const activityTypeHandler = (event) => {
        setActivityType(event.target.value)
        event.target.value.length ? setActivityTypeError(false) : setActivityTypeError(true)
    }
    const accountNameHandler = (event) => {
        setAccountName(event.target.value)
        event.target.value.length ? setAccountNameError(false) : setAccountNameError(true)
    }
    const descHandler = (event) => {
        setDesc(event.target.value)
        event.target.value.length ? setDescError(false) : setDescError(true)
    };
    const telHandler = (event) => {
        setTel(event.target.value)
        event.target.value.length === 11 && event.target.value[0] == 0 ? setTelError(false) : setTelError(true)
    };
    const addressHandler = (event) => {
        setAddress(event.target.value)
        event.target.value.length ? setAddressError(false) : setAddressError(true)
    };
    const stateHandler = (event) => {
        setState(stateList.find(item => item.value === event.target.value).value)
        setSelectedCityList(cityList[event.target.value])
    };

    const cityHandler = (event) => {
        setCity(event.target.value)
        setCityError(false)
    };

    const statusHandler = (event) => {
        setStatus(event.target.value)
    };
    const verifyStatusHandler = (event) => {
        setVerifyStatus(event.target.value)
    };
    const selectedStatusHandler = (event) => {
        setSelectedStatus(event.target.value)
    };

    // file inputs ------------------------------
    const formData = new FormData();
    const fileTypes = ["JPG", "PNG", "WEBP"];
    const [logo, setLogo] = useState(null);
    const [background, setBackground] = useState(null);
    const handleChangeLogo = (file) => {
        setLogo(file);
    };
    const handleChangeBackground = (file) => {
        setBackground(file);
    };
    // end file inputs ------------------------------
    const submitHandler = async (event) => {
        Nprogress.start()
        event.preventDefault()
        if (brandNameError || companyNameError || activityTypeError || accountNameError || descError || telError || cityError || addressError) {
            Swal.fire({
                icon: 'error',
                text: "لطفا تمام فیلد ها را پر کنید",
            })
            Nprogress.done()
        } else {
            await formData.append("brand_name", brandName)
            await formData.append("company_name", companyName)
            await formData.append("activity_type", activityType)
            await formData.append("title", accountName)
            await formData.append("subtitle", desc)
            await formData.append("phone", tel)
            await formData.append("city", city)
            await formData.append("state", stateLabel)
            await formData.append("address", address)
            await formData.append("status", data.data.status)
            await formData.append("verify_status", data.data.verify_status)
            await formData.append("selected_status", data.data.selected_status)
            await formData.append("gold_status", data.data.gold_status)
            await formData.append("expire", data.data.expire)
            await formData.append("package_id", data.data.package_id)
            await formData.append("owner_id", data.data.owner_id)
            if (background) {
                await formData.append("banner", background)
            }
            if (logo) {
                await formData.append("logo", logo)
            }
            try {
                const res = await axios.put(`${process.env.LOCAL_URL}/api/admin/companies/add-edit/${localStorage.getItem("selectedCompany")}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    }
                )
                if (res.data.status) {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'success',
                        text: "مشخصات شرکت تغییر یافت",
                    })
                    setGetData(!getData)
                    Nprogress.done()
                } else {
                    Nprogress.done()
                    await Swal.fire({
                        icon: 'error',
                        text: "مشکلی در سرور ایجاد شده",
                    })
                    Nprogress.done()
                }
                Nprogress.done()
            } catch {
                Nprogress.done()
                await Swal.fire({
                    icon: 'error',
                    text: "مشکلی در سرور ایجاد شده",
                })
            }
        }
    }
    if (data.status) {
        return (
            <Container>
                <Breadcrumbs className={"ms-md-4 py-3"} separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
                <div className={"d-flex flex-row justify-content-center"}>
                    <Col xs={12} sm={11} md={8} lg={8} xl={7} className={"bg-white rounded-3 shadow"}>
                        <form>
                            <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                                <div
                                    className={"col-md-9 col-12 d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="نام برند، نام تجاری و یا نام کسب و کار"
                                               variant="outlined"
                                               placeholder={"مثال: شرکت مهندسی آرین سازه"}
                                               value={brandName}
                                               error={brandNameError}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => brandNameHandler(event)}
                                    />
                                    <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                        فعالیت شما با چه نامی صورت می گیرد؟ این نام در کنار اخبار تولیدی شما و تحت عنوان
                                        منتشر کننده مطلب نمایش داده می‌شود. صفحه رسمی شما هم در سازمان نیوز با این نام
                                        ساخته
                                        می‌شود. توجه: تنها می‌توانید برای شرکتی که در آن مشغول هستید پروفایل ساخته و از
                                        سوی
                                        آن مطلب منتشر و توزیع کنید و یا اجازه نامه برای انتشار مطلب از سوی آن داشته
                                        باشید.
                                    </Alert>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="نام حقوقی کسب و کار"
                                               variant="outlined"
                                               value={companyName}
                                               error={companyNameError}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => companyNameHandler(event)}
                                    />
                                    <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                        نام ثبت شده در آگهی تاسیس شرکت و روزنامه رسمی در اینجا نوشته شود. در صورتی که
                                        شرکت ثبت شده ندارید، نام تجاری و یا نام کسب و کارتان را تکرار کنید.
                                    </Alert>
                                </div>
                                <div
                                    className={"col-md-9 col-12 d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField
                                        select
                                        label="حوزه فعالیت"
                                        className={"w-100"}
                                        error={activityTypeError}
                                        value={activityType}
                                        onChange={activityTypeHandler}
                                    >
                                        {linkTypeList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                        صنعت شرکتتان را جستجو و انتخاب کنید
                                    </Alert>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="نام مورد نظر برای اکانت"
                                               variant="outlined"
                                               value={accountName}
                                               error={accountNameError}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => accountNameHandler(event)}
                                    />
                                    <Alert variant={"standard"} color={"success"} className={"w-100"}>
                                        کاربران دیگر با این نام ٬ پروفایل شما را مشاهده میکنند .
                                    </Alert>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="توضیحات در مورد حوزه فعالیت شرکت"
                                               variant="outlined"
                                               value={desc}
                                               error={descError}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => descHandler(event)}
                                    />
                                    <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                        این توضیحات در پروفایل کاربری شما توسط کاربران دیگر مشاهده میشود
                                    </Alert>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="تلفن شرکت"
                                               variant="outlined"
                                               value={tel}
                                               type={"number"}
                                               error={telError}
                                               placeholder={"05131234567"}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => telHandler(event)}
                                    />
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField
                                        select
                                        label="استان"
                                        className={"w-100"}
                                        value={state}
                                        onChange={stateHandler}
                                    >
                                        {stateList.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField
                                        select
                                        label="شهر"
                                        className={"w-100"}
                                        value={city}
                                        error={cityError}
                                        onChange={cityHandler}
                                    >
                                        {selectedCityList.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div
                                    className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                    <TextField className={"w-100"}
                                               label="آدرس"
                                               variant="outlined"
                                               value={address}
                                               error={addressError}
                                               InputLabelProps={{shrink: true}}
                                               onInput={(event) => addressHandler(event)}
                                    />
                                </div>
                                <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس پروفایل شرکت (عکس بدون بک گراند از لوگوی شرکت با نسبت ۱*۱)
                                    </span>
                                    <FileUploader
                                        handleChange={handleChangeLogo}
                                        name="logo"
                                        types={fileTypes}
                                        label={"لوگوی شرکت (نسبت ۱ * ۱)"}
                                    />
                                </div>
                                <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس کنونی لوگوی شرکت
                                    </span>
                                    <img className={"w-25"} src={`${process.env.SERVER_URL}/${data.data.logo}`}/>
                                </div>
                                <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس بک گراند پروفایل شرکت (نسبت ترجیحی ۱*۳)
                                    </span>
                                    <FileUploader
                                        handleChange={handleChangeBackground}
                                        name="background"
                                        types={fileTypes}
                                        label={"بک گراند (نسبت ۳ * ۱)"}
                                    />
                                </div>
                                <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس کنونی پس زمینه شرکت
                                    </span>
                                    <img className={"w-100"} src={`${process.env.SERVER_URL}/${data.data.banner}`}/>
                                </div>
                                <div className={"w-75 d-flex flex-column gap-2 p-2"}>
                                    <Button onClick={submitHandler}
                                            className={"col-lg-3 col-md-5 col-12 align-self-end mt-5"}
                                            variant={"contained"}
                                            color={"success"}>
                                        ذخیره تغییرات
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Col>
                </div>
            </Container>
        )
    } else return (
        <Container>
            <Breadcrumbs className={"ms-md-4 py-3"} separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <div className={"d-flex flex-row justify-content-center"}>
                <Col xs={12} sm={11} md={8} lg={8} xl={7} className={"bg-white rounded-3 shadow"}>
                    <form>
                        <div className={"d-flex flex-column align-items-center gap-3 py-5"}>
                            <div
                                className={"col-md-9 col-12 d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                                <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                    فعالیت شما با چه نامی صورت می گیرد؟ این نام در کنار اخبار تولیدی شما و تحت عنوان
                                    منتشر کننده مطلب نمایش داده می‌شود. صفحه رسمی شما هم در سازمان نیوز با این نام
                                    ساخته
                                    می‌شود. توجه: تنها می‌توانید برای شرکتی که در آن مشغول هستید پروفایل ساخته و از
                                    سوی
                                    آن مطلب منتشر و توزیع کنید و یا اجازه نامه برای انتشار مطلب از سوی آن داشته
                                    باشید.
                                </Alert>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                                <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                    نام ثبت شده در آگهی تاسیس شرکت و روزنامه رسمی در اینجا نوشته شود. در صورتی که
                                    شرکت ثبت شده ندارید، نام تجاری و یا نام کسب و کارتان را تکرار کنید.
                                </Alert>
                            </div>
                            <div
                                className={"col-md-9 col-12 d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                                <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                    صنعت شرکتتان را جستجو و انتخاب کنید
                                </Alert>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                                <Alert variant={"standard"} color={"success"} className={"w-100"}>
                                    کاربران دیگر با این نام ٬ پروفایل شما را مشاهده میکنند .
                                </Alert>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                                <Alert variant={"standard"} color={"warning"} className={"w-100"}>
                                    این توضیحات در پروفایل کاربری شما توسط کاربران دیگر مشاهده میشود
                                </Alert>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div
                                className={"col-md-9 col-12  d-flex flex-column gap-2 border border-1 border-light p-2"}>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس پروفایل شرکت (عکس بدون بک گراند از لوگوی شرکت با نسبت ۱*۱)
                                    </span>
                                <Skeleton  animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس کنونی لوگوی شرکت
                                    </span>
                                <Skeleton height={50} width={50} animation={"wave"} variant={"circular"}></Skeleton>
                            </div>
                            <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس بک گراند پروفایل شرکت (نسبت ترجیحی ۱*۳)
                                    </span>
                                <Skeleton  animation={"wave"} height={100} className={"w-100"}></Skeleton>
                            </div>
                            <div className={"col-md-9 col-11  d-flex flex-column align-items-center gap-3 border border-1 border-light p-2"}>
                                    <span>
                                        عکس کنونی پس زمینه شرکت
                                    </span>
                                <Skeleton height={50} className={"w-100"}></Skeleton>
                            </div>
                            <div className={"w-75 d-flex flex-column gap-2 p-2"}>
                                <Skeleton animation={"wave"} height={50} className={"w-100"}></Skeleton>
                            </div>
                        </div>
                    </form>
                </Col>
            </div>
        </Container>
    )
}

