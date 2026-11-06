import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit3, ShieldCheck, Upload, X } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'sonner'

export default function Admin() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('Սուրճ')
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState('')
    const [description, setDescription] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    // Ջնջման հաստատման մոդալի վիճակ
    const [productToDelete, setProductToDelete] = useState(null)

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
            toast.error('Չհաջողվեց բեռնել ապրանքները: ' + error.message)
        }
        setLoading(false)
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageFile(reader.result)
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!name || !price) {
            toast.error('Խնդրում ենք լրացնել անունը և գինը')
            return
        }

        setSubmitting(true)
        let imageUrl = imageFile || (editingProduct ? editingProduct.image : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600')

        const productData = {
            name,
            price: Number(price),
            category,
            image: imageUrl,
            description: description || ''
        }

        if (editingProduct) {
            const { error } = await supabase
                .from('products')
                .update(productData)
                .eq('id', editingProduct.id)

            if (error) {
                toast.error('Սխալ խմբագրելիս: ' + error.message)
            } else {
                toast.success('Ապրանքը հաջողությամբ թարմացվեց!')
                resetForm()
                fetchProducts()
            }
        } else {
            const { error } = await supabase
                .from('products')
                .insert([productData])

            if (error) {
                toast.error('Սխալ ավելացնելիս: ' + error.message)
            } else {
                toast.success('Ապրանքը հաջողությամբ ավելացվեց!')
                resetForm()
                fetchProducts()
            }
        }
        setSubmitting(false)
    }

    function handleEdit(product) {
        setEditingProduct(product)
        setName(product.name)
        setPrice(product.price)
        setCategory(product.category)
        setImagePreview(product.image)
        setImageFile(product.image)
        setDescription(product.description || '')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function resetForm() {
        setEditingProduct(null)
        setName('')
        setPrice('')
        setCategory('Սուրճ')
        setImageFile(null)
        setImagePreview('')
        setDescription('')
    }

    async function confirmDelete() {
        if (!productToDelete) return

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', productToDelete.id)

        if (error) {
            toast.error('Չհաջողվեց ջնջել ապրանքը: ' + error.message)
        } else {
            toast.success('Ապրանքը հաջողությամբ ջնջվեց')
            fetchProducts()
        }
        setProductToDelete(null)
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            background: `linear-gradient(to bottom, rgba(14, 20, 16, 0.82), rgba(14, 20, 16, 0.93)), url('https://www.torrefacto.ru/upload/medialibrary/58d/902aex542rv7je68ckcxtxnrh4e9z144.png') center/cover no-repeat`,
            padding: '20px 15px',
            color: '#f3f4f6',
            boxSizing: 'border-box'
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
                    @media (max-width: 600px) {
                        .admin-product-card {
                            flex-direction: column;
                            align-items: flex-start !important;
                            gap: 12px !important;
                        }
                        .admin-product-actions {
                            width: 100%;
                            justify-content: flex-end;
                            border-top: 1px solid rgba(194,155,105,0.15);
                            padding-top: 8px;
                        }
                    }
                `}
            </style>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>

                {/* Ֆորմա */}
                <form onSubmit={handleSubmit} style={{
                    background: 'rgba(22, 30, 25, 0.9)',
                    border: '1px solid rgba(194, 155, 105, 0.4)',
                    borderRadius: '20px',
                    padding: '20px 20px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.7)',
                    marginBottom: '30px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ShieldCheck style={{ width: '18px', height: '18px', color: '#c29b69' }} />
                            <span>{editingProduct ? 'Խմբագրել Ապրանքը' : 'Ավելացնել Նոր Ապրանք'}</span>
                        </h2>
                        {editingProduct && (
                            <button
                                type="button"
                                onClick={resetForm}
                                style={{ background: 'transparent', border: '1px solid rgba(194,155,105,0.4)', color: '#c29b69', padding: '4px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
                            >
                                Չեղարկել
                            </button>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Ապրանքի Անուն</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Օր. Ethiopian Coffee"
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Գին (֏)</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Օր. 5500"
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Կատեգորիա</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                            >
                                <option value="Սուրճ">Սուրճ</option>
                                <option value="Թեյ">Թեյ</option>
                                <option value="Աքսեսուար">Աքսեսուար</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Նկար Համակարգչից</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <label style={{
                                background: '#2C3831',
                                border: '1px solid rgba(194,155,105,0.4)',
                                color: '#c29b69',
                                padding: '8px 14px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Upload style={{ width: '15px', height: '15px' }} />
                                <span>Ընտրել Ֆայլ</span>
                                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                            </label>
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(194,155,105,0.4)' }} />
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#b0b8b2', marginBottom: '6px' }}>Նկարագրություն</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Մանրամասն համի և հատկությունների մասին..."
                            rows={2}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: '#121714', border: '1px solid rgba(194,155,105,0.3)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        style={{
                            background: 'linear-gradient(135deg, #4A5D4F, #2C3831)',
                            color: '#f7f4ef',
                            border: '1px solid rgba(194, 155, 105, 0.5)',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 20px rgba(44,56,49,0.5)'
                        }}
                    >
                        <Plus style={{ width: '15px', height: '15px' }} />
                        <span>{submitting ? 'Կատարվում է...' : editingProduct ? 'Թարմացնել Ապրանքը' : 'Ավելացնել Ապրանք'}</span>
                    </button>
                </form>

                {/* Ցանկ */}
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
                    Առկա Ապրանքներ ({products.length})
                </h2>

                {loading ? (
                    <p style={{ color: '#b0b8b2', fontSize: '14px' }}>Բեռնվում են ապրանքները...</p>
                ) : products.length === 0 ? (
                    <p style={{ color: '#b0b8b2', fontSize: '14px' }}>Ապրանքներ դեռևս չկան։</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '30px' }}>
                        {products.map((p) => (
                            <div key={p.id} className="admin-product-card" style={{
                                background: 'rgba(22, 30, 25, 0.88)',
                                border: '1px solid rgba(194, 155, 105, 0.3)',
                                borderRadius: '14px',
                                padding: '12px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '14px',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(8px)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                                    <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover', border: '1px solid rgba(194,155,105,0.3)', background: '#121714', flexShrink: 0 }} />
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h3>
                                            <span style={{ background: 'rgba(44,56,49,0.8)', color: '#c29b69', fontSize: '10px', padding: '2px 6px', borderRadius: '6px', border: '1px solid rgba(194,155,105,0.3)' }}>{p.category}</span>
                                        </div>
                                        <p style={{ fontSize: '13px', fontWeight: '800', color: '#c29b69', margin: 0 }}>{p.price} ֏</p>
                                    </div>
                                </div>

                                <div className="admin-product-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <button
                                        onClick={() => handleEdit(p)}
                                        style={{ background: 'rgba(44,56,49,0.7)', border: '1px solid rgba(194,155,105,0.4)', color: '#c29b69', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <Edit3 style={{ width: '13px', height: '13px' }} /> Խմբագրել
                                    </button>
                                    <button
                                        onClick={() => setProductToDelete(p)}
                                        style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <Trash2 style={{ width: '13px', height: '13px' }} /> Ջնջել
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Ջնջման հաստատման մոդալ պատուհան */}
                {productToDelete && (
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
                        animation: 'backdropFadeIn 0.3s ease'
                    }}>
                        <div style={{
                            background: '#161e19',
                            border: '1px solid rgba(194, 155, 105, 0.4)',
                            borderRadius: '20px',
                            maxWidth: '400px',
                            width: '100%',
                            padding: '24px',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.9)',
                            textAlign: 'center',
                            animation: 'modalFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Վստահ՞ եք</h3>
                            <p style={{ color: '#b0b8b2', fontSize: '13px', marginBottom: '20px' }}>
                                Ցանկանում եք ջնջել <span style={{ color: '#fff', fontWeight: 'bold' }}>"{productToDelete.name}"</span> ապրանքը։
                            </p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => setProductToDelete(null)}
                                    style={{ background: 'transparent', border: '1px solid rgba(194,155,105,0.4)', color: '#fff', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                                >
                                    Չեղարկել
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    style={{ background: '#ef4444', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
                                >
                                    Այո, Ջնջել
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}