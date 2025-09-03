import prisma from '../lib/prisma';
import { initialData } from './seed';
import { ciudades } from './seed-ciudades';
import { departamentos } from './seed-departamentos';
import { Category } from '../interfaces';

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main(){

    //**---- 1.Borramos registros previos
    // await Promise.all([
    //     await prisma.productImage.deleteMany(),
    //     await prisma.productSize.deleteMany(),
    //     await prisma.product.deleteMany(),
    //     await prisma.category.deleteMany(),
    // ])

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.productSize.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();

    await prisma.city.deleteMany();
    await prisma.province.deleteMany();

    //**---- 2.Creamos registros
    const {categories, products, users} = initialData;

    //**- Creamos registros de usuarios
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    })

    //**- Creamos registros de provincias
    await prisma.province.createMany({
        data: departamentos,
        skipDuplicates: true
    })

    //**- Creamos registros de ciudades
    await prisma.city.createMany({
        data: ciudades,
        skipDuplicates: true
    })

    //**- Creamos registros de categorias como array de objetos
    const categoriesData = categories.map(category => ({name: category}))
    
    //**---- a. Creamos registros de categorias
    await prisma.category.createMany({
        data: categoriesData,
    })

    //**---- b. Buscamos las categorias
    const categoriesDB = await prisma.category.findMany()

    //- Creamos un mapa de categorias para que sea mas facil buscarlas
    const categoriesMap = categoriesDB.reduce((mapCategory : Record<string,string>, category : Category) => {
        mapCategory[category.name.toLowerCase()] = category.id;
        return mapCategory;
        // Record<string,string> es un tipo de objeto que tiene claves y valores de tipo string
    }, {} as Record<string,string>) // <string=shirt, string=categoryID>, ej: shirt:'123234354'
    //- Ejemplo retorna
    // {
    //     shirts: '33dce147-1e72-4081-93ee-2efe19211164',
    //     pants: '6e888ece-2e30-4e73-bc87-f5e0b530aa2b',
    //     hoodies: '8f4d5903-f243-405a-8700-b9cc8eb8865d',
    //     hats: '7ba23c73-687f-49c8-9cdd-f6f9cfd51738'
    //   }

    //**---- c. Creamos registros de productos
    // products.forEach(async (product) => {
    //     const {type, images, ...restProduct} = product;
    //     const productDB = await prisma.product.create({
    //         data: {
    //             ...restProduct,
    //             categoryId: categoriesMap[type],
    //         }
    //     })
    // })
    for (const product of products) {
        const { stock, type, images, sizes, ...restProduct } = product;
      
        const createdProduct = await prisma.product.create({
          data: {
            ...restProduct,
            categoryId: categoriesMap[type],
          },
        });
      
        // Crear imágenes
        await Promise.all(
          images.map((img) =>
            prisma.productImage.create({
              data: {
                url: img,
                productId: createdProduct.id,
              },
            })
          )
        );
      
        // Crear talles con stock aleatorio
        await Promise.all(
          sizes.map((size) =>
            prisma.productSize.create({
              data: {
                size,
                stock: getRandomInt(10, 15), 
                productId: createdProduct.id,
              },
            })
          )
        );
      }

    console.log('Semilla ejecutada');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
