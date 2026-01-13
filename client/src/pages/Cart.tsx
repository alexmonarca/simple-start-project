import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, ArrowLeft, ShoppingCart } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { data: cartItems, isLoading } = trpc.cart.list.useQuery(undefined, { enabled: isAuthenticated });
  const { data: products } = trpc.products.list.useQuery();

  const removeFromCartMutation = trpc.cart.remove.useMutation();
  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Faça login para acessar seu carrinho</h2>
            <Button asChild size="lg">
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = cartItems?.reduce((sum, item) => {
    const product = products?.find(p => p.id === item.productId);
    return sum + (product ? parseFloat(product.price.toString()) * item.quantity : 0);
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar Comprando
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Itens do Carrinho */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-6">Carrinho de Compras</h1>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-24 bg-muted"></div>
                  </Card>
                ))}
              </div>
            ) : !cartItems || cartItems.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-lg">Seu carrinho está vazio</p>
                  <Link href="/">
                    <Button className="mt-4">Continuar Comprando</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = products?.find(p => p.id === item.productId);
                  if (!product) return null;

                  const itemTotal = parseFloat(product.price.toString()) * item.quantity;

                  return (
                    <Card key={item.id}>
                      <CardContent className="py-4">
                        <div className="flex gap-4">
                          {/* Imagem */}
                          <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            {product.images && product.images[0] ? (
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <ShoppingCart className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          {/* Informações */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{product.category}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-border rounded-lg">
                                <button
                                  onClick={() => updateQuantityMutation.mutate({
                                    id: item.id,
                                    quantity: Math.max(1, item.quantity - 1)
                                  })}
                                  className="px-2 py-1 text-foreground hover:bg-muted"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 text-foreground">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantityMutation.mutate({
                                    id: item.id,
                                    quantity: item.quantity + 1
                                  })}
                                  className="px-2 py-1 text-foreground hover:bg-muted"
                                >
                                  +
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-bold text-accent">
                                  R$ {itemTotal.toFixed(2)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  R$ {parseFloat(product.price.toString()).toFixed(2)} un.
                                </p>
                              </div>

                              <button
                                onClick={() => removeFromCartMutation.mutate({ id: item.id })}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Resumo */}
          {cartItems && cartItems.length > 0 && (
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-foreground/80">
                      <span>Subtotal</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground/80">
                      <span>Frete</span>
                      <span>A calcular</span>
                    </div>
                    <div className="flex justify-between text-foreground/80">
                      <span>Impostos</span>
                      <span>A calcular</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span className="text-accent">R$ {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-white" size="lg">
                    Ir para Checkout
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/">Continuar Comprando</Link>
                  </Button>

                  <div className="bg-muted p-4 rounded-lg text-sm text-foreground/80">
                    <p className="font-semibold mb-2">Dúvidas?</p>
                    <p>Entre em contato conosco via WhatsApp</p>
                    <p className="font-semibold mt-2">(55) 99619-4261</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
