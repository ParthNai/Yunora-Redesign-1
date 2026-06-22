import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi, type ApiProduct, type ApiCategory, type ApiOrder } from "@/lib/api";
import { Link } from "wouter";
import logo from "@assets/02_1781943228013.png";
import {
  LayoutDashboard, Package, Tag, ShoppingBag, Users, Settings,
  LogOut, Plus, Pencil, Trash2, X, Check, Search, ChevronLeft,
  ChevronRight, AlertCircle, Loader2, Eye, EyeOff, RefreshCcw,
  TrendingUp, MessageSquare
} from "lucide-react";

type Tab = "dashboard" | "products" | "categories" | "orders" | "leads";

/* ─── tiny helpers ─── */
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium tracking-wide capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

function Spinner() {
  return <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />;
}

function EmptyRow({ cols, msg }: { cols: number; msg: string }) {
  return (
    <tr>
      <td colSpan={cols} className="px-6 py-12 text-center text-muted-foreground text-sm">{msg}</td>
    </tr>
  );
}

/* ─── Login screen ─── */
function LoginScreen({ onLogin }: { onLogin: (user: { name: string; email: string }) => void }) {
  const [email, setEmail] = useState("admin@yunora.in");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const user = await adminApi.login(email, password);
      onLogin({ name: user.name, email: user.email });
    } catch {
      setErr("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F3] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-[#E8DDD0] rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="YUNORA" className="h-10 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-[#3A2A20]">Admin Panel</h1>
          <p className="text-xs text-[#9E8A78] mt-1">Sign in to manage your store</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1.5">Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors pr-10"
              />
              <button type="button" onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E8A78] hover:text-[#3A2A20]">
                {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {err && (
            <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {err}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-[#3A2A20] text-white py-3 rounded-lg text-sm font-semibold tracking-wider hover:bg-[#4A3A30] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><Spinner /> Signing in…</> : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-[#9E8A78] hover:text-[#3A2A20] transition-colors">
            ← Back to store
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Product form modal ─── */
function ProductModal({
  product, categories, onClose, onSave,
}: {
  product: ApiProduct | null;
  categories: ApiCategory[];
  onClose: () => void;
  onSave: (data: Partial<ApiProduct> & { name: string; sku: string; price: number; stock: number }) => void;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    price: product?.price ?? 0,
    salePrice: product?.salePrice ?? "",
    stock: product?.stock ?? 0,
    color: product?.color ?? "",
    material: product?.material ?? "",
    description: product?.description ?? "",
    imageUrl: product?.imageUrl ?? "",
    categoryId: product?.categoryId ?? "",
  });

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice !== "" ? Number(form.salePrice) : null,
      stock: Number(form.stock),
      categoryId: form.categoryId !== "" ? Number(form.categoryId) : null,
      imageUrl: form.imageUrl || null,
    } as Partial<ApiProduct> & { name: string; sku: string; price: number; stock: number });
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E8DDD0]">
          <h2 className="font-serif text-xl text-[#3A2A20]">{product ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Name *</label>
              <input required value={form.name} onChange={e => set("name", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">SKU *</label>
              <input required value={form.sku} onChange={e => set("sku", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Price (₹) *</label>
              <input required type="number" min="0" value={form.price} onChange={e => set("price", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Sale Price</label>
              <input type="number" min="0" value={form.salePrice} onChange={e => set("salePrice", e.target.value)}
                placeholder="Optional"
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Stock *</label>
              <input required type="number" min="0" value={form.stock} onChange={e => set("stock", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Category</label>
              <select value={form.categoryId} onChange={e => set("categoryId", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] bg-white">
                <option value="">— None —</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Material</label>
              <input value={form.material} onChange={e => set("material", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Color</label>
              <input value={form.color} onChange={e => set("color", e.target.value)}
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Image URL</label>
              <input value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)}
                placeholder="https://..."
                className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Description</label>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3}
              className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-[#E8DDD0] text-[#3A2A20] py-2.5 rounded-lg text-sm font-medium hover:bg-muted/20 transition-colors">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-[#3A2A20] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#4A3A30] transition-colors">
              {product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Category form modal ─── */
function CategoryModal({ cat, onClose, onSave }: {
  cat: ApiCategory | null;
  onClose: () => void;
  onSave: (data: { name: string; slug: string; imageUrl?: string }) => void;
}) {
  const [name, setName] = useState(cat?.name ?? "");
  const [slug, setSlug] = useState(cat?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(cat?.imageUrl ?? "");

  function handleNameChange(v: string) {
    setName(v);
    if (!cat) setSlug(v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#E8DDD0]">
          <h2 className="font-serif text-xl text-[#3A2A20]">{cat ? "Edit Category" : "Add Category"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave({ name, slug, imageUrl: imageUrl || undefined }); }} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Name *</label>
            <input required value={name} onChange={e => handleNameChange(e.target.value)}
              className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Slug *</label>
            <input required value={slug} onChange={e => setSlug(e.target.value)}
              className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#3A2A20] uppercase tracking-wider block mb-1">Image URL</label>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..."
              className="w-full border border-[#E8DDD0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-[#E8DDD0] text-[#3A2A20] py-2.5 rounded-lg text-sm font-medium hover:bg-muted/20">Cancel</button>
            <button type="submit"
              className="flex-1 bg-[#3A2A20] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#4A3A30]">
              {cat ? "Save Changes" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Dashboard tab ─── */
function DashboardTab() {
  const { data: products } = useQuery({ queryKey: ["admin-products"], queryFn: () => adminApi.products({ limit: 100 }) });
  const { data: orders } = useQuery({ queryKey: ["admin-orders"], queryFn: () => adminApi.orders({ limit: 10 }) });
  const { data: leads } = useQuery({ queryKey: ["admin-leads"], queryFn: () => adminApi.leads({ limit: 5 }) });

  const realProducts = products?.items?.filter(p => p.name && p.price) ?? [];
  const realOrders = orders?.items?.filter(o => o.orderNumber) ?? [];

  const totalRevenue = realOrders.reduce((s, o) => s + (o.total ?? 0), 0);
  const totalStock = realProducts.reduce((s, p) => s + (p.stock ?? 0), 0);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Orders", value: String(realOrders.length), note: "All time" },
          { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, note: "All orders" },
          { label: "Products", value: String(realProducts.length), note: `${totalStock} units in stock` },
          { label: "Leads", value: String(leads?.total ?? 0), note: "Enquiries received" },
        ].map(s => (
          <div key={s.label} className="bg-card p-5 rounded-xl border border-border/30 shadow-sm">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
            <h3 className="font-serif text-2xl mb-1">{s.value}</h3>
            <p className="text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border/30 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border/30">
          <h3 className="font-serif text-lg">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Order #</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {realOrders.length === 0 ? (
                <EmptyRow cols={5} msg="No orders yet." />
              ) : realOrders.slice(0, 8).map(o => (
                <tr key={o.id ?? o.orderNumber} className="hover:bg-muted/5">
                  <td className="px-5 py-3 font-medium text-primary">{o.orderNumber}</td>
                  <td className="px-5 py-3">{o.customerName}</td>
                  <td className="px-5 py-3 font-medium">₹{(o.total ?? 0).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3"><Badge status={o.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Products tab ─── */
function ProductsTab() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ApiProduct | null | "new">(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-products", page],
    queryFn: () => adminApi.products({ limit: 20, page }),
  });

  const { data: cats } = useQuery({ queryKey: ["admin-cats"], queryFn: () => adminApi.categories() });

  const products = (data?.items ?? []).filter(p => p.name && p.price);
  const filtered = search
    ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || (p.sku ?? "").toLowerCase().includes(search.toLowerCase()))
    : products;

  const createMut = useMutation({
    mutationFn: (body: Parameters<typeof adminApi.createProduct>[0]) => adminApi.createProduct(body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-products"] }); setModal(null); },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<ApiProduct> }) => adminApi.updateProduct(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-products"] }); setModal(null); },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => adminApi.deleteProduct(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-products"] }); setDeleting(null); },
    onError: () => setDeleting(null),
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…"
            className="w-full pl-9 pr-4 py-2 border border-[#E8DDD0] rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="p-2 border border-[#E8DDD0] rounded-lg hover:bg-muted/20 transition-colors">
            <RefreshCcw className="h-4 w-4 text-muted-foreground" />
          </button>
          <button onClick={() => setModal("new")}
            className="flex items-center gap-2 bg-[#3A2A20] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A3A30] transition-colors">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider border-b border-border/30">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">SKU</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Spinner /></td></tr>
              ) : filtered.length === 0 ? (
                <EmptyRow cols={6} msg={search ? "No products match your search." : "No products yet. Click 'Add Product' to get started."} />
              ) : filtered.map(p => (
                <tr key={p.id} className="hover:bg-muted/5">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="w-9 h-9 rounded-lg object-cover border border-border/20" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center">
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <span className="font-medium text-[#3A2A20] line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{p.sku ?? "—"}</td>
                  <td className="px-5 py-3 font-medium">
                    ₹{(p.salePrice ?? p.price).toLocaleString("en-IN")}
                    {p.salePrice && <span className="ml-1 text-xs text-muted-foreground line-through">₹{p.price.toLocaleString("en-IN")}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${(p.stock ?? 0) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {p.stock ?? 0}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">
                    {cats?.find(c => c.id === p.categoryId)?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setModal(p)}
                        className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground hover:text-[#3A2A20] transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      {deleting === p.id ? (
                        <div className="flex items-center gap-1">
                          <button onClick={() => deleteMut.mutate(p.id)}
                            className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => setDeleting(null)}
                            className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground transition-colors">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleting(p.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}
                className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <ProductModal
          product={modal === "new" ? null : modal}
          categories={cats ?? []}
          onClose={() => setModal(null)}
          onSave={data => {
            if (modal === "new") createMut.mutate(data);
            else updateMut.mutate({ id: (modal as ApiProduct).id, body: data });
          }}
        />
      )}
    </div>
  );
}

/* ─── Categories tab ─── */
function CategoriesTab() {
  const qc = useQueryClient();
  const [modal, setModal] = useState<ApiCategory | null | "new">(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const { data: cats, isLoading, refetch } = useQuery({
    queryKey: ["admin-cats"],
    queryFn: () => adminApi.categories(),
  });

  const realCats = (cats ?? []).filter(c => c.name && c.slug);

  const createMut = useMutation({
    mutationFn: (body: Parameters<typeof adminApi.createCategory>[0]) => adminApi.createCategory(body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cats"] }); setModal(null); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<ApiCategory> }) => adminApi.updateCategory(id, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cats"] }); setModal(null); },
  });
  const deleteMut = useMutation({
    mutationFn: (id: number) => adminApi.deleteCategory(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-cats"] }); setDeleting(null); },
    onError: () => setDeleting(null),
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{realCats.length} categories</p>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="p-2 border border-[#E8DDD0] rounded-lg hover:bg-muted/20">
            <RefreshCcw className="h-4 w-4 text-muted-foreground" />
          </button>
          <button onClick={() => setModal("new")}
            className="flex items-center gap-2 bg-[#3A2A20] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A3A30]">
            <Plus className="h-4 w-4" /> Add Category
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border/30 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider border-b border-border/30">
            <tr>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Products</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {isLoading ? (
              <tr><td colSpan={4} className="py-12 text-center"><Spinner /></td></tr>
            ) : realCats.length === 0 ? (
              <EmptyRow cols={4} msg="No categories yet. Click 'Add Category' to get started." />
            ) : realCats.map(c => (
              <tr key={c.id} className="hover:bg-muted/5">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    {c.imageUrl ? (
                      <img src={c.imageUrl} alt={c.name} className="w-9 h-9 rounded-lg object-cover border border-border/20" />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <span className="font-medium text-[#3A2A20]">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{c.slug}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.productCount ?? 0}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setModal(c)}
                      className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground hover:text-[#3A2A20]">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    {deleting === c.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => deleteMut.mutate(c.id)}
                          className="p-1.5 rounded-md bg-red-100 text-red-600 hover:bg-red-200">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => setDeleting(null)}
                          className="p-1.5 rounded-md hover:bg-muted/40 text-muted-foreground">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleting(c.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <CategoryModal
          cat={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSave={data => {
            if (modal === "new") createMut.mutate(data);
            else updateMut.mutate({ id: (modal as ApiCategory).id, body: data });
          }}
        />
      )}
    </div>
  );
}

/* ─── Orders tab ─── */
function OrdersTab() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-orders", page],
    queryFn: () => adminApi.orders({ limit: 20, page }),
  });

  const orders = (data?.items ?? []).filter(o => o.orderNumber);
  const totalPages = data?.totalPages ?? 1;

  const updateMut = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => adminApi.updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-orders"] }),
  });

  const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button onClick={() => refetch()} className="p-2 border border-[#E8DDD0] rounded-lg hover:bg-muted/20">
          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider border-b border-border/30">
              <tr>
                <th className="px-5 py-3">Order #</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center"><Spinner /></td></tr>
              ) : orders.length === 0 ? (
                <EmptyRow cols={6} msg="No orders yet." />
              ) : orders.map(o => (
                <tr key={o.id ?? o.orderNumber} className="hover:bg-muted/5">
                  <td className="px-5 py-3 font-medium text-primary">{o.orderNumber}</td>
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium">{o.customerName}</p>
                      {o.customerEmail && <p className="text-xs text-muted-foreground">{o.customerEmail}</p>}
                    </div>
                  </td>
                  <td className="px-5 py-3 font-medium">₹{(o.total ?? 0).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3"><Badge status={o.status} /></td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-5 py-3">
                    {o.id ? (
                      <select
                        value={o.status}
                        onChange={e => updateMut.mutate({ id: o.id!, status: e.target.value })}
                        className="border border-[#E8DDD0] rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#D4AF37] bg-white"
                      >
                        {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : <span className="text-xs text-muted-foreground">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20"><ChevronLeft className="h-4 w-4" /></button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Leads tab ─── */
function LeadsTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["admin-leads", page],
    queryFn: () => adminApi.leads({ limit: 20, page }),
  });

  const leads = (data?.items ?? []).filter(l => l.name);
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <button onClick={() => refetch()} className="p-2 border border-[#E8DDD0] rounded-lg hover:bg-muted/20">
          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="bg-card rounded-xl border border-border/30 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/10 text-muted-foreground text-xs uppercase tracking-wider border-b border-border/30">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Notes</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {isLoading ? (
              <tr><td colSpan={6} className="py-12 text-center"><Spinner /></td></tr>
            ) : leads.length === 0 ? (
              <EmptyRow cols={6} msg="No leads yet." />
            ) : leads.map(l => (
              <tr key={l.id} className="hover:bg-muted/5">
                <td className="px-5 py-3 font-medium text-[#3A2A20]">{l.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{l.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{l.phone}</td>
                <td className="px-5 py-3">
                  <span className="text-xs bg-[#F5F0EA] text-[#9E8A78] px-2 py-0.5 rounded-full">{l.source}</span>
                </td>
                <td className="px-5 py-3 text-muted-foreground text-xs max-w-[200px] truncate">{l.notes ?? "—"}</td>
                <td className="px-5 py-3 text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20"><ChevronLeft className="h-4 w-4" /></button>
              <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 rounded-md border border-border/30 disabled:opacity-40 hover:bg-muted/20"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main Admin ─── */
export default function Admin() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [checking, setChecking] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    adminApi.me()
      .then(u => setUser({ name: u.name, email: u.email }))
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  async function handleLogout() {
    await adminApi.logout().catch(() => {});
    setUser(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAF7F3] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  const NAV: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard",  label: "Dashboard",  icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "products",   label: "Products",   icon: <Package className="h-4 w-4" /> },
    { id: "categories", label: "Categories", icon: <Tag className="h-4 w-4" /> },
    { id: "orders",     label: "Orders",     icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "leads",      label: "Leads",      icon: <MessageSquare className="h-4 w-4" /> },
  ];

  const TITLES: Record<Tab, string> = {
    dashboard: "Dashboard",
    products: "Products",
    categories: "Categories",
    orders: "Orders",
    leads: "Leads",
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F3]">
      {/* Sidebar — desktop */}
      <aside className="w-60 bg-[#1A1209] text-white flex flex-col hidden lg:flex shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/">
            <img src={logo} alt="YUNORA" className="h-8 brightness-0 invert" />
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-2 block">Admin Panel</span>
        </div>
        <nav className="flex-1 py-5 px-3 space-y-0.5">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === n.id ? "bg-[#D4AF37] text-[#1A1209]" : "text-white/60 hover:text-white hover:bg-white/8"}`}>
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1A1209] flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{user.name}</p>
              <p className="text-[10px] text-white/40 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8 transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-[#1A1209] text-white flex flex-col">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <img src={logo} alt="YUNORA" className="h-7 brightness-0 invert" />
              <button onClick={() => setMobileNavOpen(false)}><X className="h-5 w-5 text-white/60" /></button>
            </div>
            <nav className="flex-1 py-5 px-3 space-y-0.5">
              {NAV.map(n => (
                <button key={n.id} onClick={() => { setTab(n.id); setMobileNavOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === n.id ? "bg-[#D4AF37] text-[#1A1209]" : "text-white/60 hover:text-white hover:bg-white/8"}`}>
                  {n.icon} {n.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-white/10">
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/8">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        <header className="bg-white border-b border-[#E8DDD0] h-14 flex items-center px-5 lg:px-8 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-md hover:bg-muted/20" onClick={() => setMobileNavOpen(true)}>
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
            <h1 className="font-serif text-lg text-[#3A2A20]">{TITLES[tab]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-muted-foreground hover:text-[#3A2A20] transition-colors hidden sm:block">
              View Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1A1209] flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-8">
          {tab === "dashboard"  && <DashboardTab />}
          {tab === "products"   && <ProductsTab />}
          {tab === "categories" && <CategoriesTab />}
          {tab === "orders"     && <OrdersTab />}
          {tab === "leads"      && <LeadsTab />}
        </div>
      </main>
    </div>
  );
}
