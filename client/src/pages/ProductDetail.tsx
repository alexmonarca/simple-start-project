import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useRoute, Link } from "wouter";

export default function ProductDetail() {
  const { user, isAuthenticated } = useAuth();
  const [, params] = useRoute("/product/:id");
  const productId = params?.id ? parseInt(params.id) : null;
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = trpc.products.getById.useQuery(
    { id: productId! },
    { enabled: !!productId }
  );

  const { data: favorites } = trpc.favorites.list.useQuery(undefined, { enabled: isAuthenticated });
  const addToCartMutation = trpc.cart.add.useMutation();
  const addToFavoritesMutation = trpc.favorites.add.useMutation();
  const removeFromFavoritesMutation = trpc.favorites.remove.useMutation();

  const isFavorited = product ? favorites?.some(fav => fav.productId === product.id) || false : false;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    if (product) {
      addToCartMutation.mutate({ productId: product.id, quantity });
    }
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (product) {
      if (isFavorited) {
        removeFromFavoritesMutation.mutate({ productId: product.id });
      } else {
        addToFavoritesMutation.mutate({ productId: product.id });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-muted"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted w-3/4"></div>
                <div className="h-4 bg-muted w-1/2"></div>
                <div className="h-12 bg-muted w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Produto não encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <Link href="/">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Produtos
          </Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagens */}
          <div className="space-y-4">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                  Sem imagem
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="h-20 bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="space-y-6">
            <div>
              <span className="text-sm text-accent font-semibold">{product.category}</span>
              <h1 className="text-4xl font-bold text-foreground mt-2">{product.name}</h1>
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-accent">
                  R$ {parseFloat(product.price.toString()).toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    R$ {parseFloat(product.originalPrice.toString()).toFixed(2)}
                  </span>
                )}
              </div>
              {product.stock > 0 && (
                <p className="text-sm text-green-600 font-semibold">Em estoque ({product.stock} unidades)</p>
              )}
              {product.stock === 0 && (
                <p className="text-sm text-destructive font-semibold">Indisponível</p>
              )}
            </div>

            {/* Descrição */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Descrição</h3>
              <p className="text-foreground/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Especificações */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Especificações Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-border pb-2 last:border-0">
                        <span className="text-foreground/80 font-medium">{key}</span>
                        <span className="text-foreground font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quantidade e Ações */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-foreground hover:bg-muted"
                  >
                    −
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 border-0 text-center"
                    min="1"
                    max={product.stock}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-foreground hover:bg-muted"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleToggleFavorite}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? "fill-destructive text-destructive" : ""}`}
                  />
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-white"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? "Indisponível" : "Adicionar ao Carrinho"}
              </Button>

              <div className="bg-muted p-4 rounded-lg text-sm text-foreground/80">
                <p className="font-semibold mb-2">Informações de Entrega</p>
                <p>Entrega em todo Brasil. Consulte prazos e valores com nosso time.</p>
                <p className="mt-2 font-semibold">WhatsApp: (55) 99619-4261</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
