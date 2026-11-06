import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
    en: {
        home: "Home",
        shop: "Shop",
        admin: "Admin",
        cart: "Cart",
        heroTag: "High Quality & Unique Flavors",
        heroTitle: "Discover a New Culture of Coffee & Tea",
        heroDesc: "Specialty selected high-grade beans and herbal teas crafted for your unforgettable mornings and warm evenings.",
        shopNow: "Go to Shop",
        addToCart: "Add to Cart",
        added: "Added",
        total: "Total",
        checkout: "Checkout"
        // Այստեղ կարող եք ավելացնել մնացած տեքստերը
    },
    hy: {
        home: "Գլխավոր",
        shop: "Խանութ",
        admin: "Ադմին",
        cart: "Զամբյուղ",
        heroTag: "Բարձր որակ և անզուգական համեր",
        heroTitle: "Բացահայտեք Սուրճի և Թեյի Նոր Մշակույթը",
        heroDesc: "Հատուկ ընտրված բարձր որակի հատիկներ և բուսական թեյեր՝ պատրաստված ձեր անզուգական առավոտների և ջերմ երեկոների համար։",
        shopNow: "Անցնել Խանութ",
        addToCart: "Ավելացնել Զամբյուղ",
        added: "Ավելացված է",
        total: "Ընդհանուր գումար",
        checkout: "Հաստատել Պատվերը"
    },
    ru: {
        home: "Главная",
        shop: "Магазин",
        admin: "Админ",
        cart: "Корзина",
        heroTag: "Высокое качество и уникальные вкусы",
        heroTitle: "Откройте для себя новую культуру кофе и чая",
        heroDesc: "Отобранные зерна высшего качества и травяные чаи, созданные для ваших незабываемых утр и теплых вечеров.",
        shopNow: "Перейти в магазин",
        addToCart: "В корзину",
        added: "Добавлено",
        total: "Итого",
        checkout: "Оформить заказ"
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
    return useContext(LanguageContext)
}