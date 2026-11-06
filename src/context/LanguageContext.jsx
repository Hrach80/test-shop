import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
    en: {
        home: "Home",
        shop: "Shop",
        learn: "Learn",
        gifts: "Gift Guide",
        admin: "Admin",
        cart: "Cart",
        heroTag: "High Quality & Unique Flavors",
        heroTitle: "Discover a New Culture of Coffee & Tea",
        heroDesc: "Specialty selected high-grade beans and herbal teas crafted for your unforgettable mornings and warm evenings.",
        shopNow: "Go to Shop",
        feature1Title: "100% Premium Beans",
        feature1Desc: "Sourced from the world's best plantations with a special healing and rich aroma.",
        feature2Title: "Fast Delivery in Yerevan",
        feature2Desc: "Your order will reach your door fresh and in perfect condition.",
        feature3Title: "Trusted Quality",
        feature3Desc: "Strict quality control for every single box and package.",
        shopTitle: "Our Products",
        shopSubtitle: "Choose your favorite flavor from our premium collection",
        addToCart: "Add to Cart",
        added: "Added",
        noProducts: "No products available in the database yet. Add them via Admin.",
        close: "Close",
        details: "Description",
        adminTitle: "Add New Product",
        editTitle: "Edit Product",
        productName: "Product Name",
        price: "Price (֏)",
        category: "Category",
        selectImage: "Choose File",
        description: "Description",
        addProductBtn: "Add Product",
        updateProductBtn: "Update Product",
        cancel: "Cancel",
        existingProducts: "Existing Products",
        deleteConfirmTitle: "Delete Product?",
        deleteConfirmText: "Are you sure you want to delete",
        yesDelete: "Yes, Delete",
        catCoffee: "Coffee",
        catTea: "Tea",
        catAccessory: "Accessory",
        namePlaceholder: "E.g. Ethiopian Coffee",
        pricePlaceholder: "E.g. 5500",
        descPlaceholder: "Detailed info about taste and features...",
        cartTitle: "Shopping Cart",
        emptyCart: "Your cart is empty",
        total: "Total",
        checkout: "Checkout",

        // Notifications & Toasts
        addedToCartMsg: "added to cart!",
        removedFromCartMsg: "removed from cart",
        orderSuccessMsg: "Order placed successfully!",
        productAddedMsg: "Product added successfully!",
        productUpdatedMsg: "Product updated successfully!",
        productDeletedMsg: "Product deleted successfully",
        fillNamePriceMsg: "Please fill in name and price",
        footerDesc: "Discover the finest selection of specialty coffee, rare teas, and premium accessories delivered straight to your door.",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",
        rightsReserved: "All rights reserved.",
        // ... (պահպանեք մնացածը, ավելացրեք սրանք)
        learnTitle: "Coffee & Tea Masterclass",
        learnSubtitle: "Learn the secrets of brewing, tasting, and selecting the finest beans",
        readMore: "Read Guide",
        giftTitle: "Special Gift Guide",
        giftSubtitle: "Curated coffee and tea sets designed to delight your loved ones",
        giftTag: "Exclusive Boxes",
        exploreGifts: "Explore Sets",

        // Learn Articles
        art1Title: "The Art of V60 Pour Over",
        art1Desc: "Master the precise water temperature, pour technique, and coffee-to-water ratio for a clean, bright cup.",
        art2Title: "Choosing the Right Grind Size",
        art2Desc: "From extra-coarse French Press to ultra-fine Espresso—how grind size dictates extraction.",
        art3Title: "Understanding Coffee Notes",
        art3Desc: "Explore fruity, floral, and chocolatey undertones from Ethiopia, Colombia, and beyond.",

        // Gift Sets
        gift1Title: "Morning Bliss Box",
        gift1Desc: "Includes Single-Origin Ethiopian beans, a ceramic pour-over dripper, and a signature mug.",
        gift2Title: "Artisan Tea Collection",
        gift2Desc: "A selection of rare organic herbal teas packed in an elegant wooden keepsake box.",
        gift3Title: "Ultimate Barista Kit",
        gift3Desc: "Professional tamper, precision scale, and two bags of our top-tier dark roast blends."
        
    },
    hy: {
        home: "Գլխավոր",
        shop: "Խանութ",
        learn: "Ուղեցույց",
        gifts: "Նվերներ",
        admin: "Ադմին",
        cart: "Զամբյուղ",
        heroTag: "Բարձր որակ և անզուգական համեր",
        heroTitle: "Բացահայտեք Սուրճի և Թեյի Նոր Մշակույթը",
        heroDesc: "Հատուկ ընտրված բարձր որակի հատիկներ և բուսական թեյեր՝ պատրաստված ձեր անզուգական առավոտների և ջերմ երեկոների համար։",
        shopNow: "Անցնել Խանութ",
        feature1Title: "100% Պրեմիում Հատիկներ",
        feature1Desc: "Բերված աշխարհի լավագույն պլանտացիաներից՝ հատուկ բուժիչ և հագեցած բույրով:",
        feature2Title: "Արագ Առաքում Երևանում",
        feature2Desc: "Ձեր պատվերը կհասնի անմիջապես ձեր դուռը՝ թարմ և անթերի վիճակում:",
        feature3Title: "Վստահելի Որակ",
        feature3Desc: "Խիստ վերահսկողություն յուրաքանչյուր տուփի և փաթեթավորման համար:",
        shopTitle: "Մեր Ապրանքների Ցանկը",
        shopSubtitle: "Ընտրեք ձեր սիրելի համը մեր պրեմիում հավաքածուից",
        addToCart: "Ավելացնել Զամբյուղ",
        added: "Ավելացված է",
        noProducts: "Դեռևս ապրանքներ չկան բազայում։ Ավելացրեք Ադմինի կամ տերմինալի միջոցով:",
        close: "Փակել",
        details: "Նկարագրություն",
        adminTitle: "Ավելացնել Նոր Ապրանք",
        editTitle: "Խմբագրել Ապրանքը",
        productName: "Ապրանքի Անուն",
        price: "Գին (֏)",
        category: "Կատեգորիա",
        selectImage: "Ընտրել Ֆայլ",
        description: "Նկարագրություն",
        addProductBtn: "Ավելացնել Ապրանք",
        updateProductBtn: "Թարմացնել Ապրանքը",
        cancel: "Չեղարկել",
        existingProducts: "Առկա Ապրանքներ",
        deleteConfirmTitle: "Հեռացնե՞լ ապրանքը",
        deleteConfirmText: "Դուք պատրաստվում եք հեռացնել",
        yesDelete: "Այո, Ջնջել",
        catCoffee: "Սուրճ",
        catTea: "Թեյ",
        catAccessory: "Աքսեսուար",
        namePlaceholder: "Օր. Ethiopian Coffee",
        pricePlaceholder: "Օր. 5500",
        descPlaceholder: "Մանրամասն համի և հատկությունների մասին...",
        cartTitle: "Զամբյուղ",
        emptyCart: "Ձեր զամբյուղը դատարկ է",
        total: "Ընդհանուր գումար",
        checkout: "Հաստատել Պատվերը",

        // Notifications & Toasts
        addedToCartMsg: "ավելացվեց զամբյուղ:",
        removedFromCartMsg: "հեռացվեց զամբյուղից",
        orderSuccessMsg: "Պատվերը հաջողությամբ ձևակերպվեց:",
        productAddedMsg: "Ապրանքը հաջողությամբ ավելացվեց:",
        productUpdatedMsg: "Ապրանքը հաջողությամբ թարմացվեց:",
        productDeletedMsg: "Ապրանքը հաջողությամբ ջնջվեց:",
        fillNamePriceMsg: "Խնդրում ենք լրացնել անունը և գինը:",
        // ... (մնացածը թողեք նույնը)
        footerDesc: "Բացահայտեք բարձրորակ սուրճի, հազվագյուտ թեյերի և պրեմիում աքսեսուարների լավագույն տեսականին՝ առաքված անմիջապես ձեր դուռը։",
        quickLinks: "Արագ Հղումներ",
        contactUs: "Կապ Մեզ Հետ",
        rightsReserved: "Բոլոր իրավունքները պաշտպանված են:",
        // ... (պահպանեք մնացածը, ավելացրեք սրանք)
        learnTitle: "Սուրճի և Թեյի Վարպետաց Դասեր",
        learnSubtitle: "Բացահայտեք պատրաստման, համտեսման և լավագույն հատիկների ընտրության գաղտնիքները",
        readMore: "Կարդալ Ավելին",
        giftTitle: "Նվերների Ուղեցույց",
        giftSubtitle: "Հատուկ ընտրված սուրճի և թեյի հավաքածուներ՝ ձեր սիրելիներին ուրախացնելու համար",
        giftTag: "Բացառիկ Տուփեր",
        exploreGifts: "Դիտել Հավաքածուները",

        // Learn Articles
        art1Title: "V60 Պատրաստման Արվեստը",
        art1Desc: "Յուրացրեք ջրի ճշգրիտ ջերմաստիճանը, լցման տեխնիկան և համամասնությունը՝ մաքուր և հագեցած բաժակ ստանալու համար:",
        art2Title: "Ճիշտ Աղացման Չափի Ընտրությունը",
        art2Desc: "Ֆրանսիական մամլոսի կոպիտ աղացումից մինչև էսպրեսսոյի մանրացված տեսակներ․ ինչպես է աղացումը ազդում համի վրա:",
        art3Title: "Համային Նոտաների Բացահայտումը",
        art3Desc: "Ուսումնասիրեք մրգային, ծաղկային և շոկոլադե երանգները Եթովպիայից, Կոլումբիայից և այլ երկրներից:",

        // Gift Sets
        gift1Title: "Առավոտյան Նվեր-Տուփ",
        gift1Desc: "Ներառում է եթովպական հատիկներ, կերամիկական ձագար և բրենդային ֆինջան։",
        gift2Title: "Արհեստագործական Թեյերի Հավաքածու",
        gift2Desc: "Հազվագյուտ օրգանական բուսական թեյերի ընտրանի՝ էլեգանտ փայտե տուփով։",
        gift3Title: "Բարիստայի Պրեմիում Հավաքածու",
        gift3Desc: "Մասնագիտական սեղմիչ, ճշգրիտ կշեռք և մեր լավագույն մուգ տապակած հատիկների երկու տուփ։"
    },
    ru: {
        home: "Главная",
        shop: "Магазин",
        learn: "Гайды",
        gifts: "Подарки",
        admin: "Админ",
        cart: "Корзина",
        heroTag: "Высокое качество и уникальные вкусы",
        heroTitle: "Откройте для себя новую культуру кофе и чая",
        heroDesc: "Отобранные зерна высшего качества и травяные чаи, созданные для ваших незабываемых утр и теплых вечеров.",
        shopNow: "Перейти в магазин",
        feature1Title: "100% Премиум Зерна",
        feature1Desc: "Доставлены с лучших плантаций мира с особым насыщенным ароматом.",
        feature2Title: "Быстрая доставка в Ереване",
        feature2Desc: "Ваш заказ будет доставлен к вашей двери свежим и в идеальном состоянии.",
        feature3Title: "Надежное качество",
        feature3Desc: "Строгий контроль качества каждой коробочки и упаковки.",
        shopTitle: "Список товаров",
        shopSubtitle: "Выберите свой любимый вкус из нашей премиальной коллекции",
        addToCart: "В корзину",
        added: "Добавлено",
        noProducts: "В базе пока нет товаров. Добавьте их через админ-панель.",
        close: "Закрыть",
        details: "Описание",
        adminTitle: "Добавить новый товар",
        editTitle: "Редактировать товар",
        productName: "Название товара",
        price: "Цена (֏)",
        category: "Категория",
        selectImage: "Выбрать файл",
        description: "Описание",
        addProductBtn: "Добавить товар",
        updateProductBtn: "Обновить товар",
        cancel: "Отмена",
        existingProducts: "Существующие товары",
        deleteConfirmTitle: "Удалить товар?",
        deleteConfirmText: "Вы собираетесь удалить",
        yesDelete: "Да, удалить",
        catCoffee: "Кофе",
        catTea: "Чай",
        catAccessory: "Аксессуар",
        namePlaceholder: "Напр. Ethiopian Coffee",
        pricePlaceholder: "Напр. 5500",
        descPlaceholder: "Подробная информация о вкусе и свойствах...",
        cartTitle: "Корзина",
        emptyCart: "Ваша корзина пуста",
        total: "Итого",
        checkout: "Оформить заказ",

        // Notifications & Toasts
        addedToCartMsg: "добавлено в корзину!",
        removedFromCartMsg: "удален из корзины",
        orderSuccessMsg: "Заказ успешно оформлен!",
        productAddedMsg: "Товар успешно добавлен!",
        productUpdatedMsg: "Товар успешно обновлен!",
        productDeletedMsg: "Товар успешно удален",
        fillNamePriceMsg: "Пожалуйста, заполните название и цену",
        // ... (մնացածը թողեք նույնը)
        footerDesc: "Откройте для себя лучший выбор кофе специальной обжарки, редких чаев и премиальных аксессуаров с доставкой до вашей двери.",
        quickLinks: "Быстрые ссылки",
        contactUs: "Свяжитесь с нами",
        rightsReserved: "Все права защищены.",
        // ... (պահպանեք մնացածը, ավելացրեք սրանք)
        learnTitle: "Мастер-классы по кофе и чаю",
        learnSubtitle: "Узнайте секреты заваривания, дегустации и выбора лучших зерен",
        readMore: "Читать статью",
        giftTitle: "Гид по подаркам",
        giftSubtitle: "Подобранные наборы кофе и чая, созданные чтобы радовать близких",
        giftTag: "Эксклюзивные наборы",
        exploreGifts: "Смотреть наборы",

        // Learn Articles
        art1Title: "Искусство заваривания V60",
        art1Desc: "Освойте точную температуру воды, технику вливания и соотношение для идеальной чашки.",
        art2Title: "Выбор правильного помола",
        art2Desc: "От грубого для френч-пресса до ультратонкого для эспрессо — как помол влияет на экстракцию.",
        art3Title: "Понимание кофейных нот",
        art3Desc: "Изучите фруктовые, цветочные и шоколадные оттенки из Эфиопии, Колумбии и других стран.",

        // Gift Sets
        gift1Title: "Набор «Утреннее блаженство»",
        gift1Desc: "Включает моносорт из Эфиопии, керамический пуровер и фирменную чашку.",
        gift2Title: "Коллекция элитных чаев",
        gift2Desc: "Ассорти редких органических травяных чаев в элегантной деревянной шкатулке.",
        gift3Title: "Профессиональный набор бариста",
        gift3Desc: "Профессиональный темпер, точные весы и две пачки фирменного темного обжара."
    
    }
}

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem('cosmic_lang') || 'en')

    useEffect(() => {
        localStorage.setItem('cosmic_lang', lang)
    }, [lang])

    const t = (key) => translations[lang]?.[key] || key

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}