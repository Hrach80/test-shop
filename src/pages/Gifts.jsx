import { Gift, Sparkles, ShoppingBag } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { toast } from 'sonner'

export default function Gifts() {
    const { t } = useLanguage()

    const giftSets = [
        {
            id: 101,
            name: t('gift1Title'),
            desc: t('gift1Desc'),
            price: '14,500 ֏',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800'
        },
        {
            id: 102,
            name: t('gift2Title'),
            desc: t('gift2Desc'),
            price: '18,000 ֏',
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800'
        },
        {
            id: 103,
            name: t('gift3Title'),
            desc: t('gift3Desc'),
            price: '28,500 ֏',
            image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800'
        }
    ]

    function handleAddGift(gift) {
        const cartItem = {
            id: gift.id,
            name: gift.name,
            price: parseInt(gift.price.replace(/[^0-9]/g, '')),
            image: gift.image,
            quantity: 1
        }
        const existingCart = JSON.parse(localStorage.getItem('cosmic_cart')) || []
        const itemIndex = existingCart.findIndex(item => item.id === gift.id)

        if (itemIndex > -1) {
            existingCart[itemIndex].quantity += 1
        } else {
            existingCart.push(cartItem)
        }

        localStorage.setItem('cosmic_cart', JSON.stringify(existingCart))
        window.dispatchEvent(new Event('storage'))
        toast.success(`"${gift.name}" ${t('addedToCartMsg')}`)
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.85), rgba(14, 20, 16, 0.95)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '40px 20px',
            color: '#f3f4f6',
            boxSizing: 'border-box',
            width: '100%'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }}>

                {/* Վերնագիր */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        background: 'rgba(44, 56, 49, 0.7)',
                        border: '1px solid rgba(194, 155, 105, 0.4)',
                        color: '#c29b69',
                        fontSize: '12px',
                        marginBottom: '12px'
                    }}>
                        <Gift style={{ width: '13px', height: '13px' }} />
                        <span>{t('giftTag')}</span>
                    </div>
                    <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>
                        {t('giftTitle')}
                    </h1>
                    <p style={{ color: '#b0b8b2', fontSize: '14px', maxWidth: '600px', margin: '0 auto' }}>
                        {t('giftSubtitle')}
                    </p>
                </div>

                {/* Նվերների Ցանկ */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    paddingBottom: '40px'
                }}>
                    {giftSets.map((gift) => (
                        <div key={gift.id} style={{
                            background: 'rgba(22, 30, 25, 0.88)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid rgba(194, 155, 105, 0.3)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                            display: 'flex',
                            flexDirection: 'column',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{ height: '220px', width: '100%', position: 'relative' }}>
                                <img src={gift.image} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0 }}>
                                        {gift.name}
                                    </h3>
                                    <span style={{ fontSize: '16px', fontWeight: '900', color: '#c29b69' }}>
                                        {gift.price}
                                    </span>
                                </div>

                                <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px', flexGrow: 1 }}>
                                    {gift.desc}
                                </p>

                                <button
                                    onClick={() => handleAddGift(gift)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                        color: '#f7f4ef',
                                        border: '1px solid rgba(194, 155, 105, 0.4)',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        boxShadow: '0 6px 20px rgba(44,56,49,0.5)'
                                    }}
                                >
                                    <ShoppingBag style={{ width: '16px', height: '16px' }} />
                                    <span>{t('addToCart')}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}