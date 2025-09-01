import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { currencyFormat } from "@/utils/currencyFormat";

interface Props {
  title: string;
  orders?: any[];
}

export const CardList = ({ title, orders }: Props) => {
  return (
    <section>
      <h1 className="mb-4 text-xl font-medium">{title}</h1>

      <div className="flex flex-col gap-4">
        {orders && orders.map((order: any) => (
          <Card
            key={order.id}
            className="flex flex-col gap-2 p-1.5 bg-gray-50 border-blue-700 shadow-md transition-all hover:shadow-lg"
          >
            <CardContent className="p-0">
              <ul className="flex flex-col gap-2">
                {order.orderItems.map((item: any) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border py-1 px-2 bg-background/20"
                  >
                    {/* izquierda: producto */}
                    <div>
                      <p className="font-medium text-black">{item.product.title}</p>
                      <div className="mt-1 flex gap-2">
                        <Badge variant="secondary" className="bg-amber-200 text-black font-bold">
                          Size: {item.size}
                        </Badge>
                        <Badge variant="secondary" className="bg-green-200 text-black font-bold">
                          Qty: {item.quantity}
                        </Badge>
                      </div>
                    </div>

                    {/* derecha: precio */}
                    <span className="text-sm font-semibold text-blue-700">
                      {currencyFormat(item.product.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex bg-blue-700 rounded-lg justify-between px-2 py-0.5 text-sm">
              <span className="text-white">
                Tax: <strong>{currencyFormat(order.tax)}</strong>
              </span>
              <span className="font-bold text-white ">
                Total: {currencyFormat(order.total)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
