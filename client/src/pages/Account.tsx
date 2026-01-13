import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, User, Heart, Package } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "favorites">("profile");

  const { data: orders } = trpc.orders.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: favorites } = trpc.favorites.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: products } = trpc.products.list.useQuery();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Faça login para acessar sua conta</h2>
            <Button asChild size="lg">
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user?.name || "Usuário"}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === "profile"
                        ? "bg-accent text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <User className="w-4 h-4 inline mr-2" />
                    Perfil
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === "orders"
                        ? "bg-accent text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Package className="w-4 h-4 inline mr-2" />
                    Pedidos
                  </button>
                  <button
                    onClick={() => setActiveTab("favorites")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeTab === "favorites"
                        ? "bg-accent text-white"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Heart className="w-4 h-4 inline mr-2" />
                    Favoritos
                  </button>
                </nav>

                <Button
                  onClick={logout}
                  variant="outline"
                  className="w-full mt-6"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo */}
          <div className="md:col-span-3">
            {/* Perfil */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Meu Perfil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Nome</label>
                      <Input value={user?.name || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <Input value={user?.email || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Telefone</label>
                      <Input value={user?.phone || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Cidade</label>
                      <Input value={user?.city || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
                      <Input value={user?.state || ""} disabled className="bg-muted" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CEP</label>
                      <Input value={user?.zipCode || ""} disabled className="bg-muted" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Endereço</label>
                    <textarea
                      value={user?.address || ""}
                      disabled
                      className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-foreground"
                      rows={3}
                    />
                  </div>

                  <div className="bg-muted p-4 rounded-lg text-sm text-foreground/80">
                    <p className="font-semibold mb-2">Conta Criada</p>
                    <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-BR") : "N/A"}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Para editar suas informações, entre em contato conosco via WhatsApp: (55) 99619-4261
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pedidos */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Meus Pedidos</h2>

                {!orders || orders.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground text-lg">Você ainda não fez nenhum pedido</p>
                      <Link href="/">
                        <Button className="mt-4">Começar a Comprar</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id}>
                        <CardContent className="py-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Número do Pedido</p>
                              <p className="font-semibold text-foreground">{order.orderNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Data</p>
                              <p className="font-semibold text-foreground">
                                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Status</p>
                              <p className={`font-semibold ${
                                order.status === "delivered" ? "text-green-600" :
                                order.status === "shipped" ? "text-blue-600" :
                                order.status === "processing" ? "text-yellow-600" :
                                "text-gray-600"
                              }`}>
                                {order.status === "pending" && "Pendente"}
                                {order.status === "processing" && "Processando"}
                                {order.status === "shipped" && "Enviado"}
                                {order.status === "delivered" && "Entregue"}
                                {order.status === "cancelled" && "Cancelado"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total</p>
                              <p className="font-semibold text-accent">
                                R$ {parseFloat(order.total.toString()).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Favoritos */}
            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Meus Favoritos</h2>

                {!favorites || favorites.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground text-lg">Você não tem produtos favoritos</p>
                      <Link href="/">
                        <Button className="mt-4">Explorar Produtos</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite) => {
                      const product = products?.find(p => p.id === favorite.productId);
                      if (!product) return null;

                      return (
                        <Card key={favorite.id} className="hover:shadow-lg transition">
                          <div className="relative h-48 bg-muted flex items-center justify-center overflow-hidden">
                            {product.images && product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-muted-foreground text-center">
                                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                              </div>
                            )}
                          </div>

                          <CardHeader>
                            <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                          </CardHeader>

                          <CardContent>
                            <p className="text-2xl font-bold text-accent mb-4">
                              R$ {parseFloat(product.price.toString()).toFixed(2)}
                            </p>
                            <Link href={`/product/${product.id}`}>
                              <Button className="w-full bg-accent hover:bg-accent/90">
                                Ver Detalhes
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
