import React, { useState } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import { LanguageCode, speakText, useLanguage } from '../../lib/i18n';

interface LocalizedStreamContent {
  binColor: string;
  title: string;
  subtitle: string;
  itemsIncluded: string[];
  itemsExcluded: string[];
  processingMethod: string;
  ttsSummary: string;
}

interface SegregationStreamConfig {
  id: string;
  accentClass: string;
  badgeClass: string;
  content: Record<LanguageCode, LocalizedStreamContent>;
}

const SEGREGATION_STREAMS: SegregationStreamConfig[] = [
  {
    id: 'wet-organic',
    accentClass:
      'border-t-4 border-t-emerald-500 border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/50 hover:shadow-emerald-500/15',
    badgeClass:
      'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
    content: {
      EN: {
        binColor: 'Green Municipal Bin',
        title: '01. Wet & Biodegradable Waste (Organic)',
        subtitle: 'Daily kitchen, vegetable market, and horticulture organics',
        itemsIncluded: [
          'Cooked and uncooked food scraps, fruit peels, vegetable trimmings',
          'Coffee grounds, tea leaves, eggshells, and garden leaves',
          'Compostable soiled paper napkins and flowers',
        ],
        itemsExcluded: [
          'Plastic carry bags or multi-layered foil wrappers',
          'Glass shards, metallic tins, or synthetic diapers',
        ],
        processingMethod:
          'Routed to decentralized ward bio-methanation plants and aerobic windrow composting units.',
        ttsSummary:
          'Green Bin is for Wet and Organic Waste such as vegetable peels, leftover food, tea leaves, and garden trimmings. Never mix plastic wrappers inside the Green Bin.',
      },
      HI: {
        binColor: 'हरा नगर निगम डस्टबिन',
        title: '01. गीला और जैविक कचरा (ऑर्गेनिक)',
        subtitle: 'रसोई, सब्जी मंडी और बागवानी का सड़ने योग्य कचरा',
        itemsIncluded: [
          'पका और कच्चा बचा हुआ भोजन, फलों के छिलके, सब्जियों के डंठल',
          'चाय की पत्ती, अंडे के छिलके और बगीचे की सूखी पत्तियां',
          'पूजा के फूल और खाद्य-युक्त कागज नैपकिन',
        ],
        itemsExcluded: [
          'प्लास्टिक की थैलियां या मल्टी-लेयर पन्नी पैकेट',
          'कांच के टुकड़े, धातु के डिब्बे या डायपर',
        ],
        processingMethod:
          'वार्ड स्तर के बायो-मेथनेशन संयंत्रों और जैविक खाद (कम्पोस्ट) इकाइयों में भेजा जाता है।',
        ttsSummary:
          'हरा डस्टबिन गीले और जैविक कचरे के लिए है जैसे फलों और सब्जियों के छिलके, बचा हुआ खाना, चाय की पत्ती और बगीचे की पत्तियां। हरे डस्टबिन में कभी भी प्लास्टिक न डालें।',
      },
      TA: {
        binColor: 'பச்சை நகராட்சி குப்பைத் தொட்டி',
        title: '01. மக்கும் ஈரக் கழிவுகள் (இயற்கை கழிவு)',
        subtitle: 'சமையலறை, காய்கறி சந்தை மற்றும் தோட்டக் கழிவுகள்',
        itemsIncluded: [
          'சமைத்த மற்றும் சமைக்காத உணவுக் கழிவுகள், பழத் தோல்கள், காய்கறி கழிவுகள்',
          'தேயிலை, முட்டை ஓடுகள் மற்றும் தோட்டத்து இலைகள்',
          'பூக்கள் மற்றும் மக்கும் காகித நாப்கின்கள்',
        ],
        itemsExcluded: [
          'பிளாஸ்டிக் பைகள் அல்லது அலுமினிய உறைகள்',
          'கண்ணாடித் துண்டுகள், உலோக டப்பாக்கள் அல்லது டயப்பர்கள்',
        ],
        processingMethod:
          'வார்டு அளவிலான உயிரி எரிவாயு மற்றும் இயற்கை உரம் தயாரிக்கும் மையங்களுக்கு அனுப்பப்படுகிறது.',
        ttsSummary:
          'பச்சை குப்பைத் தொட்டி மக்கும் ஈரக் கழிவுகளுக்கானது. காய்கறி தோல்கள், உணவுக் கழிவுகள் மற்றும் இலைகளை இதில் போடவும். பிளாஸ்டிக் பைகளை இதில் போட வேண்டாம்.',
      },
      TE: {
        binColor: 'ఆకుపచ్చ మున్సిపల్ డస్ట్‌బిన్',
        title: '01. తడి & జీవ విచ్ఛిన్న వ్యర్థాలు (సేంద్రీయ)',
        subtitle: 'వంటగది, కూరగాయల మార్కెట్ మరియు తోట వ్యర్థాలు',
        itemsIncluded: [
          'మిగిలిపోయిన ఆహారం, పండ్ల తొక్కలు, కూరగాయల వ్యర్థాలు',
          'టీ ఆకులు, గుడ్డు పెంకులు మరియు తోట ఆకులు',
          'పువ్వులు మరియు తడి కాగితపు నాప్‌కిన్లు',
        ],
        itemsExcluded: [
          'ప్లాస్టిక్ కవర్లు లేదా ఫాయిల్ ప్యాకెట్లు',
          'గాజు ముక్కలు, లోహపు డబ్బాలు లేదా డైపర్లు',
        ],
        processingMethod:
          'వార్డు స్థాయి బయో-మెథనేషన్ ప్లాంట్లు మరియు సేంద్రీయ కంపోస్ట్ కేంద్రాలకు పంపబడుతుంది.',
        ttsSummary:
          'ఆకుపచ్చ డస్ట్‌బిన్ తడి మరియు సేంద్రీయ వ్యర్థాల కోసం. కూరగాయల తొక్కలు, మిగిలిన ఆహారం మరియు ఆకులను ఇందులో వేయండి. ప్లాస్టిక్ కవర్లను కలపవద్దు.',
      },
      MR: {
        binColor: 'हिरवी महानगरपालिका कचराकुंडी',
        title: '01. ओला आणि विघटनशील कचरा (सेंद्रिय)',
        subtitle: 'स्वयंपाकघर, भाजी मंडई आणि बागेतील ओला कचरा',
        itemsIncluded: [
          'शिजवलेले व न शिजवलेले उरलेले अन्न, फळांची साले, भाज्यांचे देठ',
          'चहाची पत्ती, अंड्याची टरफले आणि बागेतील पालापाचोळा',
          'निर्माल्य फुले आणि खराब झालेले कागदी नॅपकिन',
        ],
        itemsExcluded: [
          'प्लास्टिकच्या पिशव्या किंवा चकचकीत रॅपर्स',
          'काचेचे तुकडे, धातूचे डबे किंवा डायपर',
        ],
        processingMethod:
          'प्रभाग स्तरावरील बायो-मिथेनेशन प्रकल्प आणि सेंद्रिय खत प्रकल्पांमध्ये पाठवले जाते.',
        ttsSummary:
          'हिरवी कचराकुंडी ओल्या आणि सेंद्रिय कचऱ्यासाठी आहे. यात भाज्यांची साले, उरलेले अन्न आणि पालापाचोळा टाकावा. यात प्लास्टिक पिशव्या टाकू नयेत.',
      },
      BN: {
        binColor: 'সবুজ পৌর ডাস্টবিন',
        title: '০১. ভেজা ও পচনশীল বর্জ্য (জৈব)',
        subtitle: 'রান্নাঘর, সবজি বাজার এবং বাগানের জৈব বর্জ্য',
        itemsIncluded: [
          'রান্না করা ও কাঁচা খাবারের অবশিষ্টাংশ, ফলের খোসা, সবজির অংশ',
          'চায়ের পাতা, ডিমের খোসা এবং বাগানের ঝরা পাতা',
          'ফুল এবং পচনশীল টিস্যু পেপার',
        ],
        itemsExcluded: [
          'প্লাস্টিক ব্যাগ বা ফয়েল প্যাকেট',
          'ভাঙা কাঁচ, ধাতব কৌটা বা ডায়াপার',
        ],
        processingMethod:
          'ওয়ার্ড পর্যায়ের বায়ো-মিথেনেশন প্ল্যান্ট এবং জৈব সার (কম্পোস্ট) কেন্দ্রে পাঠানো হয়।',
        ttsSummary:
          'সবুজ ডাস্টবিন ভেজা এবং জৈব বর্জ্যের জন্য, যেমন সবজির খোসা, খাবারের অবশিষ্টাংশ এবং গাছের পাতা। সবুজ বিনে কখনো প্লাস্টিক ফেলবেন না।',
      },
    },
  },
  {
    id: 'dry-recyclable',
    accentClass:
      'border-t-4 border-t-sky-500 border-slate-200 dark:border-slate-800/80 hover:border-sky-500/50 hover:shadow-sky-500/15',
    badgeClass: 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30',
    content: {
      EN: {
        binColor: 'Blue Municipal Bin',
        title: '02. Dry & Recyclable Waste (Plastic / Paper / Metal)',
        subtitle: 'Clean, moisture-free recyclable packaging and containers',
        itemsIncluded: [
          'PET water bottles, HDPE milk/detergent jugs, clean plastic tubs',
          'Corrugated cardboard boxes, newspapers, office paper, magazines',
          'Aluminum beverage cans, tin containers, and intact glass bottles',
        ],
        itemsExcluded: [
          'Food-soiled pizza boxes or wet kitchen waste',
          'Used syringes, broken mercury bulbs, or lithium batteries',
        ],
        processingMethod:
          'Sorted at Material Recovery Facilities (MRFs) by registered Swachhata self-help groups for baling and recycling.',
        ttsSummary:
          'Blue Bin is for Dry Recyclable Waste including clean plastic bottles, cardboard, newspapers, metal cans, and glass containers. Rinse food residue before disposal.',
      },
      HI: {
        binColor: 'नीला नगर निगम डस्टबिन',
        title: '02. सूखा और पुनर्चक्रण योग्य कचरा (प्लास्टिक / कागज / धातु)',
        subtitle: 'साफ और नमी-मुक्त रीसायकल होने वाली पैकेजिंग और डिब्बे',
        itemsIncluded: [
          'पानी की प्लास्टिक बोतलें, दूध/डिटर्जेंट के डिब्बे, साफ प्लास्टिक कंटेनर',
          'गत्ते के डिब्बे (कार्डबोर्ड), अखबार, ऑफिस का कागज और पत्रिकाएं',
          'एल्युमिनियम कैन, टिन के डिब्बे और साबुत कांच की बोतलें',
        ],
        itemsExcluded: [
          'जूठे भोजन से सने डिब्बे या गीला रसोई कचरा',
          'इस्तेमाल की गई सिरिंज, टूटे बल्ब या बैटरियां',
        ],
        processingMethod:
          'मटेरियल रिकवरी फैसिलिटी (MRF) में स्वच्छता समूहों द्वारा छंटाई और रीसाइक्लिंग के लिए भेजा जाता है।',
        ttsSummary:
          'नीला डस्टबिन सूखे और रीसायकल होने वाले कचरे के लिए है, जैसे साफ प्लास्टिक बोतलें, अखबार, गत्ता, धातु के डिब्बे और कांच की बोतलें।',
      },
      TA: {
        binColor: 'நீல நகராட்சி குப்பைத் தொட்டி',
        title: '02. மக்காத உலர் கழிவுகள் (பிளாஸ்டிக் / காகிதம் / உலோகம்)',
        subtitle: 'மறுசுழற்சி செய்யக்கூடிய சுத்தமான உலர் பொருட்கள்',
        itemsIncluded: [
          'தண்ணீர் பாட்டில்கள், பால் பாக்கெட்டுகள், சுத்தமான பிளாஸ்டிக் டப்பாக்கள்',
          'அட்டைப் பெட்டிகள், செய்தித்தாள்கள், காகிதங்கள் மற்றும் புத்தகங்கள்',
          'அலுமினிய கேன்கள், தகர டப்பாக்கள் மற்றும் கண்ணாடி பாட்டில்கள்',
        ],
        itemsExcluded: [
          'உணவு ஒட்டிய பெட்டிகள் அல்லது ஈரமான சமையலறை கழிவுகள்',
          'மருத்துவ ஊசிகள், உடைந்த பல்புகள் அல்லது பேட்டரிகள்',
        ],
        processingMethod:
          'வள மீட்பு மையங்களில் (MRF) தரம் பிரிக்கப்பட்டு மறுசுழற்சிக்கு அனுப்பப்படுகிறது.',
        ttsSummary:
          'நீல குப்பைத் தொட்டி மக்காத உலர் கழிவுகளுக்கானது. சுத்தமான பிளாஸ்டிக் பாட்டில்கள், செய்தித்தாள்கள், அட்டைப் பெட்டிகள் மற்றும் உலோக டப்பாக்களை இதில் போடவும்.',
      },
      TE: {
        binColor: 'నీలం మున్సిపల్ డస్ట్‌బిన్',
        title: '02. పొడి & రీసైకిల్ చేయగల వ్యర్థాలు (ప్లాస్టిక్ / కాగితం / లోహం)',
        subtitle: 'శుభ్రమైన, తేమ లేని రీసైకిల్ ప్యాకేజింగ్ మరియు డబ్బాలు',
        itemsIncluded: [
          'ప్లాస్టిక్ నీళ్ల సీసాలు, పాల ప్యాకెట్లు, శుభ్రమైన ప్లాస్టిక్ డబ్బాలు',
          'కార్డ్‌బోర్డ్ పెట్టెలు, వార్తాపత్రికలు, కాగితాలు మరియు మ్యాగజైన్లు',
          'అల్యూమినియం క్యాన్లు, టిన్ డబ్బాలు మరియు గాజు సీసాలు',
        ],
        itemsExcluded: [
          'ఆహారం అంటుకున్న పెట్టెలు లేదా తడి వంటగది చెత్త',
          'వాడిన సిరంజీలు, పగిలిన బల్బులు లేదా బ్యాటరీలు',
        ],
        processingMethod:
          'మెటీరియల్ రికవరీ ఫెసిలిటీ (MRF) కేంద్రాలలో వేరు చేయబడి రీసైక్లింగ్‌కు పంపబడుతుంది.',
        ttsSummary:
          'నీలం డస్ట్‌బిన్ పొడి మరియు రీసైకిల్ వ్యర్థాల కోసం. శుభ్రమైన ప్లాస్టిక్ సీసాలు, కార్డ్‌బోర్డ్, వార్తాపత్రికలు మరియు లోహపు డబ్బాలను ఇందులో వేయండి.',
      },
      MR: {
        binColor: 'निळी महानगरपालिका कचराकुंडी',
        title: '02. सुका आणि पुनर्वापरयोग्य कचरा (प्लास्टिक / कागद / धातू)',
        subtitle: 'स्वच्छ, कोरडे प्लास्टिक, कागद आणि धातूचे साहित्य',
        itemsIncluded: [
          'पाण्याच्या बाटल्या, दुधाच्या पिशव्या, स्वच्छ प्लास्टिकचे डबे',
          'पुठ्ठ्याची खोकी, वर्तमानपत्रे, कार्यालयातील कागद आणि मासिके',
          'अॅल्युमिनियम कॅन, पत्र्याचे डबे आणि काचेच्या बाटल्या',
        ],
        itemsExcluded: [
          'अन्नाने माखलेले बॉक्स किंवा ओला कचरा',
          'वापरलेल्या सुया, फुटलेले बल्ब किंवा बॅटरी',
        ],
        processingMethod:
          'मटेरियल रिकव्हरी फॅसिलिटी (MRF) केंद्रात वर्गीकरण करून पुनर्वापरासाठी पाठवले जाते.',
        ttsSummary:
          'निळी कचराकुंडी सुक्या कचऱ्यासाठी आहे. यात स्वच्छ प्लास्टिक बाटल्या, पुठ्ठा, वर्तमानपत्रे आणि धातूचे डबे टाकावेत.',
      },
      BN: {
        binColor: 'নীল পৌর ডাস্টবিন',
        title: '০২. শুকনো ও পুনর্ব্যবহারযোগ্য বর্জ্য (প্লাস্টিক / কাগজ / ধাতু)',
        subtitle: 'পরিষ্কার ও শুষ্ক রিসাইকেলযোগ্য প্যাকেজিং ও পাত্র',
        itemsIncluded: [
          'পানির প্লাস্টিক বোতল, দুধ বা ডিটারজেন্টের কৌটা, পরিষ্কার প্লাস্টিক পাত্র',
          'কার্ডবোর্ড বাক্স, সংবাদপত্র, অফিসের কাগজ এবং ম্যাগাজিন',
          'অ্যালুমিনিয়াম ক্যান, টিনের কৌটা এবং অক্ষত কাঁচের বোতল',
        ],
        itemsExcluded: [
          'খাবার লেগে থাকা বাক্স বা রান্নাঘরের ভেজা বর্জ্য',
          'ব্যবহৃত সিরিঞ্জ, ভাঙা বাল্ব বা লিথিয়াম ব্যাটারি',
        ],
        processingMethod:
          'ম্যাটেরিয়াল রিকভারি ফ্যাসিলিটি (MRF) কেন্দ্রে বাছাই করে রিসাইক্লিংয়ের জন্য পাঠানো হয়।',
        ttsSummary:
          'নীল ডাস্টবিন শুকনো এবং রিসাইকেলযোগ্য বর্জ্যের জন্য, যেমন পরিষ্কার প্লাস্টিকের বোতল, কার্ডবোর্ড, সংবাদপত্র এবং ধাতব পাত্র।',
      },
    },
  },
  {
    id: 'e-waste',
    accentClass:
      'border-t-4 border-t-amber-400 border-slate-200 dark:border-slate-800/80 hover:border-amber-400/50 hover:shadow-amber-500/15',
    badgeClass: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30',
    content: {
      EN: {
        binColor: 'Grey / Yellow Authorised Collection',
        title: '03. Electronic & Electrical Waste (E-Waste)',
        subtitle: 'End-of-life consumer electronics, cables, and circuit boards',
        itemsIncluded: [
          'Discarded mobile phones, chargers, power banks, and USB cables',
          'Compact fluorescent lamps (CFLs), LED tubes, and computer peripherals',
          'Lithium-ion, alkaline, and lead-acid household batteries',
        ],
        itemsExcluded: [
          'Wet food waste or general municipal street sweepings',
          'Bio-medical clinical waste',
        ],
        processingMethod:
          'Collected weekly at ward E-Waste kiosks for certified precious-metal recovery and safe lead/mercury extraction.',
        ttsSummary:
          'E-Waste such as old chargers, batteries, circuit boards, and CFL bulbs must be handed over separately at designated ward e-waste collection drives.',
      },
      HI: {
        binColor: 'पीला / ग्रे अधिकृत ई-कचरा संग्रहण',
        title: '03. इलेक्ट्रॉनिक और इलेक्ट्रिकल कचरा (ई-कचरा)',
        subtitle: 'खराब इलेक्ट्रॉनिक उपकरण, तार और सर्किट बोर्ड',
        itemsIncluded: [
          'पुराने मोबाइल फोन, चार्जर, पावर बैंक और यूएसबी केबल',
          'सीएफएल (CFL) बल्ब, एलईडी ट्यूब और कंप्यूटर के पुर्जे',
          'लिथियम-आयन और घरेलू बैटरियां',
        ],
        itemsExcluded: [
          'गीला खाद्य कचरा या सामान्य सड़क का कचरा',
          'बायो-मेडिकल अस्पताल कचरा',
        ],
        processingMethod:
          'सुरक्षित धातु निष्कर्षण और पारा/सीसा निस्तारण के लिए साप्ताहिक वार्ड ई-कचरा केंद्रों पर एकत्र किया जाता है।',
        ttsSummary:
          'ई-कचरा जैसे पुराने चार्जर, बैटरियां, खराब मोबाइल और सीएफएल बल्ब को सामान्य कचरे में न मिलाएं, इन्हें वार्ड के ई-कचरा केंद्र में अलग से दें।',
      },
      TA: {
        binColor: 'மஞ்சள் / சாம்பல் மின்னணு கழிவு சேகரிப்பு',
        title: '03. மின்னணு மற்றும் மின்சார கழிவுகள் (E-Waste)',
        subtitle: 'பழுதடைந்த மின்னணு சாதனங்கள், வயர்கள் மற்றும் பேட்டரிகள்',
        itemsIncluded: [
          'பழைய மொபைல் போன்கள், சார்ஜர்கள், பவர் பேங்குகள் மற்றும் கேபிள்கள்',
          'சி.எஃப்.எல் (CFL) பல்புகள், எல்இடி விளக்குகள் மற்றும் கணினி பாகங்கள்',
          'லித்தியம் மற்றும் வீட்டு உபயோக பேட்டரிகள்',
        ],
        itemsExcluded: [
          'மக்கும் உணவுக் கழிவுகள் அல்லது தெருக் குப்பைகள்',
          'மருத்துவமனை கழிவுகள்',
        ],
        processingMethod:
          'வார்டு மின்னணு கழிவு மையங்களில் சேகரிக்கப்பட்டு பாதுகாப்பான முறையில் மறுசுழற்சி செய்யப்படுகிறது.',
        ttsSummary:
          'பழைய சார்ஜர்கள், பேட்டரிகள் மற்றும் பல்புகள் போன்ற மின்னணு கழிவுகளை வார்டு மின்னணு கழிவு சேகரிப்பு மையத்தில் தனியாக வழங்கவும்.',
      },
      TE: {
        binColor: 'పసుపు / గ్రే ఇ-వ్యర్థాల సేకరణ',
        title: '03. ఎలక్ట్రానిక్ & ఎలక్ట్రికల్ వ్యర్థాలు (ఇ-వ్యర్థాలు)',
        subtitle: 'పాడైన ఎలక్ట్రానిక్ పరికరాలు, కేబుల్స్ మరియు బ్యాటరీలు',
        itemsIncluded: [
          'పాత మొబైల్ ఫోన్లు, ఛార్జర్లు, పవర్ బ్యాంకులు మరియు కేబుల్స్',
          'సిఎఫ్ఎల్ (CFL) బల్బులు, ఎల్ఇడి ట్యూబులు మరియు కంప్యూటర్ భాగాలు',
          'లిథియం-అయాన్ మరియు గృహ బ్యాటరీలు',
        ],
        itemsExcluded: [
          'తడి ఆహార వ్యర్థాలు లేదా సాధారణ వీధి చెత్త',
          'బయో-మెడికల్ వ్యర్థాలు',
        ],
        processingMethod:
          'సురక్షిత లోహ సేకరణ కోసం వార్డు ఇ-వ్యర్థాల కియోస్క్‌లలో వారానికొకసారి సేకరించబడుతుంది.',
        ttsSummary:
          'పాత ఛార్జర్లు, బ్యాటరీలు మరియు బల్బులు వంటి ఇ-వ్యర్థాలను సాధారణ చెత్తలో వేయకుండా వార్డు ఇ-వ్యర్థాల సేకరణ కేంద్రంలో ఇవ్వండి.',
      },
      MR: {
        binColor: 'पिवळा / राखाडी अधिकृत ई-कचरा संकलन',
        title: '03. इलेक्ट्रॉनिक आणि इलेक्ट्रिकल कचरा (ई-कचरा)',
        subtitle: 'निकामी इलेक्ट्रॉनिक उपकरणे, केबल्स आणि सर्किट बोर्ड',
        itemsIncluded: [
          'जुने मोबाईल फोन, चार्जर, पॉवर बँक आणि यूएसबी केबल्स',
          'सीएफएल (CFL) बल्ब, एलईडी ट्यूब आणि संगणकाचे भाग',
          'लिथियम-आयन आणि घरगुती बॅटरी',
        ],
        itemsExcluded: [
          'ओला अन्न कचरा किंवा रस्त्यावरील सामान्य कचरा',
          'वैद्यकीय जैव-कचरा',
        ],
        processingMethod:
          'सुरक्षित विल्हेवाट आणि धातू पुनर्प्राप्तीसाठी प्रभाग ई-कचरा केंद्रांवर संकलित केले जाते.',
        ttsSummary:
          'जुने चार्जर, बॅटरी, मोबाईल आणि सीएफएल बल्ब यांसारखा ई-कचरा नेहमी प्रभागातील अधिकृत ई-कचरा संकलन केंद्रात वेगळा द्यावा.',
      },
      BN: {
        binColor: 'হলুদ / ধূসর অনুমোদিত ই-বর্জ্য সংগ্রহ',
        title: '০৩. ইলেকট্রনিক ও বৈদ্যুতিক বর্জ্য (ই-বর্জ্য)',
        subtitle: 'নষ্ট ইলেকট্রনিক যন্ত্রপাতি, তার এবং সার্কিট বোর্ড',
        itemsIncluded: [
          'পুরনো মোবাইল ফোন, চার্জার, পাওয়ার ব্যাংক এবং ইউএসবি কেবল',
          'সিএফএল (CFL) বাল্ব, এলইডি টিউব এবং কম্পিউটারের যন্ত্রাংশ',
          'লিথিয়াম-আয়ন এবং গৃহস্থালির ব্যাটারি',
        ],
        itemsExcluded: [
          'ভেজা খাবারের বর্জ্য বা সাধারণ রাস্তার আবর্জনা',
          'চিকিৎসা সংক্রান্ত বায়ো-মেডিকেল বর্জ্য',
        ],
        processingMethod:
          'নিরাপদ ধাতু নিষ্কাশনের জন্য সাপ্তাহিক ওয়ার্ড ই-বর্জ্য কিয়স্কে সংগ্রহ করা হয়।',
        ttsSummary:
          'পুরনো চার্জার, ব্যাটারি এবং বাল্বের মতো ই-বর্জ্য সাধারণ ডাস্টবিনে না ফেলে ওয়ার্ডের নির্ধারিত ই-বর্জ্য কেন্দ্রে আলাদাভাবে জমা দিন।',
      },
    },
  },
  {
    id: 'hazardous',
    accentClass:
      'border-t-4 border-t-rose-500 border-slate-200 dark:border-slate-800/80 hover:border-rose-500/50 hover:shadow-rose-500/15',
    badgeClass: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30',
    content: {
      EN: {
        binColor: 'Red / Black Domestic Hazardous Bin',
        title: '04. Domestic Hazardous & Sanitary Waste',
        subtitle: 'Chemical containers, sharps, and wrapped sanitary waste',
        itemsIncluded: [
          'Expired medicines, pesticide cans, paint tins, and solvent bottles',
          'Sanitary pads and diapers wrapped securely in newspaper marked with a red cross',
          'Broken glass or razor blades sealed inside puncture-proof cardboard',
        ],
        itemsExcluded: [
          'Recyclable paper or kitchen compostables',
          'Bulk construction and demolition rubble',
        ],
        processingMethod:
          'Incinerated or neutralized at authorized Treatment, Storage, and Disposal Facilities (TSDF) to protect sanitation workers from injury.',
        ttsSummary:
          'Red Hazardous Bin is for sanitary waste, expired medicines, paint cans, and wrapped sharp objects. Always wrap sharp glass and sanitary items securely to protect sanitation workers.',
      },
      HI: {
        binColor: 'लाल / काला घरेलू खतरनाक कचरा पात्र',
        title: '04. घरेलू खतरनाक और सैनिटरी कचरा',
        subtitle: 'रासायनिक डिब्बे, नुकीली वस्तुएं और लिपटा हुआ सैनिटरी कचरा',
        itemsIncluded: [
          'एक्सपायर दवाइयां, कीटनाशक स्प्रे, पेंट के डिब्बे और केमिकल बोतलें',
          'लाल निशान वाले कागज में सुरक्षित रूप से लिपटे सैनिटरी पैड और डायपर',
          'मोटे गत्ते में बंद टूटे कांच या रेज़र ब्लेड',
        ],
        itemsExcluded: [
          'रीसायकल होने वाला कागज या रसोई का गीला कचरा',
          'निर्माण और तोड़फोड़ का मलबा',
        ],
        processingMethod:
          'सफाई कर्मचारियों को चोट और संक्रमण से बचाने के लिए अधिकृत ट्रीटमेंट प्लांट (TSDF) में सुरक्षित रूप से नष्ट किया जाता है।',
        ttsSummary:
          'लाल डस्टबिन खतरनाक और सैनिटरी कचरे के लिए है, जैसे एक्सपायर दवाइयां, पेंट के डिब्बे और सैनिटरी पैड। नुकीले कांच और सैनिटरी कचरे को हमेशा कागज या गत्ते में लपेटकर ही डालें।',
      },
      TA: {
        binColor: 'சிவப்பு / கருப்பு அபாயகரமான கழிவுத் தொட்டி',
        title: '04. வீட்டு அபாயகரமான மற்றும் சுகாதாரக் கழிவுகள்',
        subtitle: 'ரசாயன டப்பாக்கள், கூர்மையான பொருட்கள் மற்றும் சுகாதாரக் கழிவுகள்',
        itemsIncluded: [
          'காலாவதியான மருந்துகள், பூச்சிக்கொல்லி டப்பாக்கள் மற்றும் பெயிண்ட் டப்பாக்கள்',
          'சிவப்பு குறியிட்ட காகிதத்தில் சுற்றப்பட்ட நாப்கின்கள் மற்றும் டயப்பர்கள்',
          'தடிமனான அட்டையில் பாதுகாப்பாக கட்டப்பட்ட உடைந்த கண்ணாடி மற்றும் பிளேடுகள்',
        ],
        itemsExcluded: [
          'மறுசுழற்சி காகிதம் அல்லது சமையலறை கழிவுகள்',
          'கட்டிட இடிபாட்டுக் கழிவுகள்',
        ],
        processingMethod:
          'தூய்மைப் பணியாளர்களின் பாதுகாப்பிற்காக அங்கீகரிக்கப்பட்ட சுத்திகரிப்பு நிலையங்களில் (TSDF) பாதுகாப்பாக அழிக்கப்படுகிறது.',
        ttsSummary:
          'சிவப்பு தொட்டி அபாயகரமான மற்றும் சுகாதாரக் கழிவுகளுக்கானது. காலாவதியான மருந்துகள், உடைந்த கண்ணாடி மற்றும் சுகாதாரக் கழிவுகளை பாதுகாப்பாக காகிதத்தில் சுற்றி இதில் போடவும்.',
      },
      TE: {
        binColor: 'ఎరుపు / నలుపు ప్రమాదకర వ్యర్థాల బుట్ట',
        title: '04. గృహ ప్రమాదకర & శానిటరీ వ్యర్థాలు',
        subtitle: 'రసాయన డబ్బాలు, పదునైన వస్తువులు మరియు శానిటరీ వ్యర్థాలు',
        itemsIncluded: [
          'గడువు ముగిసిన మందులు, పురుగుమందుల డబ్బాలు మరియు పెయింట్ టిన్లు',
          'ఎరుపు గుర్తు ఉన్న కాగితంలో చుట్టిన శానిటరీ ప్యాడ్లు మరియు డైపర్లు',
          'మందపాటి అట్టపెట్టెలో ప్యాక్ చేసిన పగిలిన గాజు లేదా బ్లేడ్లు',
        ],
        itemsExcluded: [
          'రీసైకిల్ కాగితం లేదా వంటగది తడి చెత్త',
          'భవన నిర్మాణ వ్యర్థాలు',
        ],
        processingMethod:
          'పారిశుద్ధ్య కార్మికులను రక్షించడానికి అధీకృత శుద్ధి కేంద్రాలలో (TSDF) సురక్షితంగా నిర్వీర్యం చేయబడుతుంది.',
        ttsSummary:
          'ఎరుపు డస్ట్‌బిన్ ప్రమాదకర మరియు శానిటరీ వ్యర్థాల కోసం. గడువు ముగిసిన మందులు, పగిలిన గాజు మరియు శానిటరీ వస్తువులను సురక్షితంగా చుట్టి ఇందులో వేయండి.',
      },
      MR: {
        binColor: 'लाल / काळी घरगुती घातक कचराकुंडी',
        title: '04. घरगुती घातक आणि सॅनिटरी कचरा',
        subtitle: 'रासायनिक डबे, धारदार वस्तू आणि गुंडाळलेला सॅनिटरी कचरा',
        itemsIncluded: [
          'मुदत संपलेली औषधे, कीटकनाशक डबे, रंगाचे डबे आणि केमिकल बाटल्या',
          'लाल फुली केलेल्या वर्तमानपत्रात सुरक्षितपणे गुंडाळलेले सॅनिटरी पॅड आणि डायपर',
          'जाड पुठ्ठ्यात बंद केलेले तुटलेले काच किंवा ब्लेड',
        ],
        itemsExcluded: [
          'पुनर्वापरयोग्य कागद किंवा स्वयंपाकघरातील ओला कचरा',
          'बांधकामाचा राडारोडा',
        ],
        processingMethod:
          'स्वच्छता कर्मचाऱ्यांच्या सुरक्षिततेसाठी अधिकृत प्रक्रिया केंद्रात (TSDF) शास्त्रोक्त पद्धतीने नष्ट केले जाते.',
        ttsSummary:
          'लाल कचराकुंडी घातक आणि सॅनिटरी कचऱ्यासाठी आहे. मुदत संपलेली औषधे, धारदार काच आणि सॅनिटरी कचरा नेहमी कागदात किंवा पुठ्ठ्यात सुरक्षितपणे गुंडाळून टाकावा.',
      },
      BN: {
        binColor: 'লাল / কালো গৃহস্থালি বিপজ্জনক বর্জ্য বিন',
        title: '০৪. গৃহস্থালি বিপজ্জনক ও স্যানিটারি বর্জ্য',
        subtitle: 'রাসায়নিক পাত্র, ধারালো বস্তু এবং মোড়ানো স্যানিটারি বর্জ্য',
        itemsIncluded: [
          'মেয়াদোত্তীর্ণ ওষুধ, কীটনাশকের কৌটা, রঙের টিন এবং রাসায়নিক বোতল',
          'লাল চিহ্ন দেওয়া কাগজে ভালোভাবে মোড়ানো স্যানিটারি প্যাড ও ডায়াপার',
          'শক্ত কার্ডবোর্ডে আটকানো ভাঙা কাঁচ বা ব্লেড',
        ],
        itemsExcluded: [
          'রিসাইকেলযোগ্য কাগজ বা রান্নাঘরের পচনশীল বর্জ্য',
          'নির্মাণ কাজের ইট-পাথরের ধ্বংসাবশেষ',
        ],
        processingMethod:
          'পরিচ্ছন্নতা কর্মীদের আঘাত থেকে রক্ষা করতে অনুমোদিত ট্রিটমেন্ট প্ল্যান্টে (TSDF) নিরাপদে নিষ্কাশন করা হয়।',
        ttsSummary:
          'লাল ডাস্টবিন বিপজ্জনক এবং স্যানিটারি বর্জ্যের জন্য, যেমন মেয়াদোত্তীর্ণ ওষুধ, রঙের কৌটা এবং স্যানিটারি বর্জ্য। ভাঙা কাঁচ ও ধারালো বস্তু সবসময় শক্ত কাগজে মুড়ে ফেলুন।',
      },
    },
  },
];

export default function AwarenessPage() {
  const { lang, t } = useLanguage();
  const [selectedStreamId, setSelectedStreamId] = useState<string>('ALL');
  const [speakingStreamId, setSpeakingStreamId] = useState<string | null>(null);

  const visibleStreams =
    selectedStreamId === 'ALL'
      ? SEGREGATION_STREAMS
      : SEGREGATION_STREAMS.filter((s) => s.id === selectedStreamId);

  const handleSpeakStream = (streamId: string, summary: string) => {
    setSpeakingStreamId(streamId);
    speakText(summary, lang);
    window.setTimeout(() => {
      setSpeakingStreamId((prev) => (prev === streamId ? null : prev));
    }, 5500);
  };

  return (
    <div className="space-y-8 sm:space-y-10 min-w-0">
      {/* Header */}
      <div className="animate-fade-in-up border-b border-slate-200 dark:border-slate-800/80 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide mb-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>SWACHHATA SEGREGATION PROTOCOL</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display break-words">
            {t('awarenessHeader')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 break-words">
            {t('awarenessSubheader')}
          </p>
        </div>

        {/* Interactive Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl">
          {[
            { id: 'ALL', label: t('streamAllTab') },
            { id: 'wet-organic', label: t('streamWetTab') },
            { id: 'dry-recyclable', label: t('streamDryTab') },
            { id: 'e-waste', label: t('streamEwasteTab') },
            { id: 'hazardous', label: t('streamHazardousTab') },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedStreamId(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer ${
                selectedStreamId === tab.id
                  ? 'bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Stream Interactive Segregation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up delay-75">
        {visibleStreams.map((stream) => {
          const loc = stream.content[lang] || stream.content.EN;
          const isSpeaking = speakingStreamId === stream.id;
          return (
            <article
              key={stream.id}
              className={`group bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5 hover:-translate-y-1 hover:shadow-2xl duration-300 transition-all overflow-hidden min-w-0 ${stream.accentClass}`}
            >
              <div className="space-y-4 min-w-0">
                <div className="flex items-start justify-between gap-3 min-w-0">
                  <div className="min-w-0">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-semibold tracking-wide break-words ${stream.badgeClass}`}
                    >
                      {loc.binColor}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-2 font-display break-words">
                      {loc.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 break-words">
                      {loc.subtitle}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeakStream(stream.id, loc.ttsSummary)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-950/90 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500/40 rounded-xl inline-flex items-center gap-1.5 shrink-0 active:scale-95 transition-all cursor-pointer"
                  >
                    {isSpeaking ? (
                      <span
                        aria-hidden="true"
                        className="inline-flex items-end gap-0.5 h-3.5 w-3.5 shrink-0"
                      >
                        <span className="w-0.5 h-full bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-1" />
                        <span className="w-0.5 h-full bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-2" />
                        <span className="w-0.5 h-full bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-3" />
                        <span className="w-0.5 h-full bg-emerald-600 dark:bg-emerald-400 rounded-full animate-eq-4" />
                      </span>
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    )}
                    <span>{t('listenAudioBtn')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs">
                  <div className="min-w-0 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/20">
                    <p className="font-bold text-emerald-800 dark:text-emerald-300 mb-1.5 break-words">
                      {t('permittedItemsTitle')}
                    </p>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4 break-words">
                      {loc.itemsIncluded.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-0 p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-500/20">
                    <p className="font-bold text-rose-800 dark:text-rose-300 mb-1.5 break-words">
                      {t('prohibitedItemsTitle')}
                    </p>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc pl-4 break-words">
                      {loc.itemsExcluded.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 break-words">
                <strong className="text-emerald-800 dark:text-emerald-300">
                  {t('municipalProcessingPrefix')}{' '}
                </strong>
                <span>{loc.processingMethod}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Civic Disposal Guidelines & Bulk Generator Compliance */}
      <section className="animate-fade-in-up delay-150 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden transition-all">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display break-words">
          {t('charterSectionTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 min-w-0">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 break-words">
              {t('charter1Title')}
            </h3>
            <p className="break-words">{t('charter1Desc')}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 min-w-0">
            <h3 className="text-sm font-bold text-cyan-700 dark:text-cyan-300 break-words">
              {t('charter2Title')}
            </h3>
            <p className="break-words">{t('charter2Desc')}</p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 min-w-0">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 break-words">
              {t('charter3Title')}
            </h3>
            <p className="break-words">{t('charter3Desc')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
