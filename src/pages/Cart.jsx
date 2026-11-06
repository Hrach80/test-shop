import { useState, useEffect } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useLanguage } from '../context/LanguageContext'

export default function Cart() {
    const { t } = useLanguage()
    const [cart, setCart] = useState([])

    useEffect(() => {
        loadCart()
    }, [])

    function loadCart() {
        const savedCart = JSON.parse(localStorage.getItem('cosmic_cart')) || []
        setCart(savedCart)
    }

    function updateQuantity(id, delta) {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta
                return newQty > 0 ? { ...item, quantity: newQty } : null
            }
            return item
        }).filter(Boolean)

        setCart(updatedCart)
        localStorage.setItem('cosmic_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('storage'))
    }

    function removeItem(id, name) {
        const updatedCart = cart.filter(item => item.id !== id)
        setCart(updatedCart)
        localStorage.setItem('cosmic_cart', JSON.stringify(updatedCart))
        window.dispatchEvent(new Event('storage'))
        toast.success(`"${name}" ${t('removedFromCartMsg')}`)
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.82), rgba(14, 20, 16, 0.93)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '30px 16px',
            color: '#f3f4f6',
            boxSizing: 'border-box',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
        }}>
            <style>
                {`
                    @media (max-width: 768px) {
                        .cart-container {
                            grid-template-columns: 1fr !important;
                        }
                        .cart-item-row {
                            flex-direction: column !important;
                            align-items: stretch !important;
                            gap: 14px !important;
                        }
                        .cart-item-actions {
                            justify-content: space-between !important;
                            width: 100% !important;
                            border-top: 1px solid rgba(194,155,105,0.15);
                            padding-top: 10px;
                        }
                    }
                `}
            </style>

            <div style={{
                maxWidth: '900px',
                width: '100%',
                margin: '0 auto',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch'
            }}>

                <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShoppingCart style={{ width: '22px', height: '22px', color: '#c29b69' }} />
                    <span>{t('cartTitle')}</span>
                </h1>

                {cart.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '50px 20px',
                        background: 'rgba(22, 30, 25, 0.85)',
                        border: '1px solid rgba(194, 155, 105, 0.3)',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        <ShoppingCart style={{ width: '48px', height: '48px', color: '#c29b69', opacity: 0.5, marginBottom: '16px' }} />
                        <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}>{t('emptyCart')}</h2>
                        <p style={{ color: '#b0b8b2', fontSize: '13px', marginBottom: '20px' }}>Explore our premium products and add your favorite flavors.</p>
                        <Link
                            to="/shop"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 24px',
                                background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                color: '#f7f4ef',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '700',
                                fontSize: '13px',
                                border: '1px solid rgba(194, 155, 105, 0.4)',
                                boxShadow: '0 8px 20px rgba(44,56,49,0.5)'
                            }}
                        >
                            <span>{t('shop')}</span>
                            <ArrowRight style={{ width: '16px', height: '16px' }} />
                        </Link>
                    </div>
                ) : (
                    <div className="cart-container" style={{
                        display: 'grid',
                        gridTemplateColumns: '1.6fr 1fr',
                        gap: '20px',
                        alignItems: 'start',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        {/* Ապրանքների ցանկ */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item-row" style={{
                                    background: 'rgba(22, 30, 25, 0.88)',
                                    border: '1px solid rgba(194, 155, 105, 0.3)',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '16px',
                                    boxShadow: '0 6px 15px rgba(0,0,0,0.5)',
                                    backdropFilter: 'blur(8px)',
                                    boxSizing: 'border-box',
                                    width: '100%'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '55px', height: '55px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(194,155,105,0.3)', background: '#121714', flexShrink: 0 }} />
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h3>
                                            <p style={{ fontSize: '13px', fontWeight: '800', color: '#c29b69', margin: 0 }}>{item.price} ֏</p>
                                        </div>
                                    </div>

                                    <div className="cart-item-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                        {/* Քանակի փոփոխություն */}
                                        <div style={{ display: 'flex', alignItems: 'center', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', borderRadius: '8px', padding: '3px' }}>
                                            <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'transparent', border: 'none', color: '#c29b69', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Minus style={{ width: '12px', height: '12px' }} />
                                            </button>
                                            <span style={{ fontSize: '13px', fontWeight: 'bold', padding: '0 8px', color: '#fff' }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'transparent', border: 'none', color: '#c29b69', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Plus style={{ width: '12px', height: '12px' }} />
                                            </button>
                                        </div>

                                        {/* Ջնջել */}
                                        <button onClick={() => removeItem(item.id, item.name)} style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', padding: '8px 10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Trash2 style={{ width: '15px', height: '15px' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Պատվերի ամփոփում (Checkout Card) */}
                        <div style={{
                            background: 'rgba(22, 30, 25, 0.9)',
                            border: '1px solid rgba(194, 155, 105, 0.4)',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(10px)',
                            boxSizing: 'border-box',
                            width: '100%'
                        }}>
                            <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '16px', borderBottom: '1px solid rgba(194,155,105,0.2)', paddingBottom: '10px' }}>
                                Summary
                            </h2>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '15px' }}>
                                <span style={{ color: '#b0b8b2' }}>{t('total')}:</span>
                                <span style={{ fontWeight: '900', color: '#c29b69', fontSize: '18px' }}>{totalPrice.toLocaleString()} ֏</span>
                            </div>

                            <button
                                onClick={() => toast.success(t('orderSuccessMsg'))}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                    color: '#f7f4ef',
                                    border: '1px solid rgba(194, 155, 105, 0.5)',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 20px rgba(44,56,49,0.5)',
                                    boxSizing: 'border-box'
                                }}
                            >
                                {t('checkout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}