import { useState, useEffect } from 'react'
import { ShoppingCart, X, Check } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'sonner'
import Loader from '../components/Loader'

export default function Shop() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [addedId, setAddedId] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        setLoading(true)
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false })

        if (!error) {
            setProducts(data || [])
        } else {
            toast.error('Չհաջողվեց բեռնել ապրանքները բազայից')
        }
        setLoading(false)
    }

    function addToCart(product, e) {
        if (e) e.stopPropagation()
        const existingCart = JSON.parse(localStorage.getItem('cosmic_cart')) || []
        const itemIndex = existingCart.findIndex(item => item.id === product.id)

        if (itemIndex > -1) {
            existingCart[itemIndex].quantity += 1
        } else {
            existingCart.push({ ...product, quantity: 1 })
        }

        localStorage.setItem('cosmic_cart', JSON.stringify(existingCart))
        window.dispatchEvent(new Event('storage'))

        toast.success(`"${product.name}" ավելացվեց զամբյուղ!`)

        setAddedId(product.id)
        setTimeout(() => setAddedId(null), 1500)
    }

    if (loading) {
        return <Loader text="Բեռնվում են մեր պրեմիում համերը..." />
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.82), rgba(14, 20, 16, 0.93)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '30px 20px',
            color: '#f3f4f6',
            boxSizing: 'border-box',
            width: '100%'
        }}>
            <style>
                {`
                    @keyframes modalFadeIn {
                        0% { opacity: 0; transform: scale(0.92) translateY(15px); }
                        100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    @keyframes backdropFadeIn {
                        0% { opacity: 0; }
                        100% { opacity: 1; }
                    }
                `}
            </style>

            <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>

                {/* Վերնագիր */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '6px' }}>
                        Մեր Ապրանքների <span style={{ color: '#c29b69' }}>Ցանկը</span>
                    </h1>
                    <p style={{ color: '#b0b8b2', fontSize: '13px' }}>
                        Ընտրեք ձեր սիրելի համը մեր պրեմիում հավաքածուից
                    </p>
                </div>

                {products.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#b0b8b2',
                        padding: '30px',
                        background: 'rgba(22, 30, 25, 0.85)',
                        border: '1px solid rgba(194,155,105,0.3)',
                        borderRadius: '16px',
                        maxWidth: '380px',
                        margin: '0 auto',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.6)'
                    }}>
                        Դեռևս ապրանքներ չկան բազայում։ Ավելացրեք Ադմինի կամ տերմինալի միջոցով:
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '20px',
                        paddingBottom: '30px',
                        boxSizing: 'border-box'
                    }}>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)'
                                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.7), 0 0 15px rgba(194,155,105,0.2)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0px)'
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)'
                                }}
                                style={{
                                    background: 'rgba(22, 30, 25, 0.85)',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(194, 155, 105, 0.3)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '16px',
                                    backdropFilter: 'blur(8px)',
                                    boxSizing: 'border-box'
                                }}
                            >
                                <div style={{
                                    height: '160px',
                                    width: '100%',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(194,155,105,0.2)',
                                    background: '#121714',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    marginBottom: '12px'
                                }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <span style={{
                                        position: 'absolute',
                                        top: '8px',
                                        right: '8px',
                                        background: 'rgba(18, 23, 20, 0.85)',
                                        color: '#c29b69',
                                        padding: '2px 8px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        border: '1px solid rgba(194,155,105,0.4)'
                                    }}>
                                        {product.category}
                                    </span>
                                </div>

                                <div style={{ marginBottom: '12px', flexGrow: 1 }}>
                                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
                                    <p style={{ fontSize: '16px', fontWeight: '800', color: '#c29b69', margin: 0 }}>{product.price} ֏</p>
                                </div>

                                <button
                                    onClick={(e) => addToCart(product, e)}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(194,155,105,0.4)',
                                        background: addedId === product.id ? '#059669' : 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                                        color: '#f7f4ef',
                                        boxShadow: '0 6px 15px rgba(44,56,49,0.5)',
                                        transition: 'all 0.2s',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    {addedId === product.id ? (
                                        <> <Check style={{ width: '14px', height: '14px' }} /> Ավելացված է </>
                                    ) : (
                                        <> <ShoppingCart style={{ width: '14px', height: '14px' }} /> Ավելացնել Զամբյուղ </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Մոդալ Պատուհան (Կենտրոնացված և հավասարաչափ տարածություններով) */}
                {selectedProduct && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100,
                        padding: '20px',
                        boxSizing: 'border-box',
                        animation: 'backdropFadeIn 0.4s ease'
                    }}>
                        <div style={{
                            background: '#161e19',
                            border: '1px solid rgba(194, 155, 105, 0.4)',
                            borderRadius: '24px',
                            maxWidth: '480px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
                            position: 'relative',
                            boxSizing: 'border-box',
                            animation: 'modalFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                style={{
                                    position: 'absolute',
                                    top: '14px',
                                    right: '14px',
                                    background: 'rgba(0,0,0,0.7)',
                                    border: '1px solid rgba(194,155,105,0.4)',
                                    color: '#fff',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    zIndex: 10
                                }}
                            >
                                <X style={{ width: '16px', height: '16px' }} />
                            </button>

                            <div style={{ height: '200px', width: '100%', background: '#121714' }}>
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <div style={{ padding: '24px', boxSizing: 'border-box' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{
                                        background: 'rgba(44, 56, 49, 0.8)',
                                        color: '#c29b69',
                                        padding: '3px 10px',
                                        borderRadius: '6px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        border: '1px solid rgba(194,155,105,0.4)'
                                    }}>
                                        {selectedProduct.category}
                                    </span>
                                    <span style={{ fontSize: '18px', fontWeight: '900', color: '#c29b69' }}>
                                        {selectedProduct.price} ֏
                                    </span>
                                </div>

                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                                    {selectedProduct.name}
                                </h2>

                                <p style={{ color: '#b0b8b2', fontSize: '13px', lineHeight: '1.5', marginBottom: '24px' }}>
                                    {selectedProduct.description || 'Այս ապրանքը չունի լրացուցիչ նկարագրություն, սակայն այն բարձրորակ պրեմիում տեսականի է։'}
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        onClick={(e) => {
                                            addToCart(selectedProduct, e)
                                            setSelectedProduct(null)
                                        }}
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
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            boxShadow: '0 8px 20px rgba(44,56,49,0.5)',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <ShoppingCart style={{ width: '16px', height: '16px' }} />
                                        <span>Ավելացնել Զամբյուղում</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}