from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cart, CartItem
from products.models import Product, ProductImage


# GET OR CREATE CART USING SESSION
def get_cart(request):
    if not request.session.session_key:
        request.session.create()

    session_id = request.session.session_key
    cart, created = Cart.objects.get_or_create(session_id=session_id)
    return cart


# ADD TO CART
@api_view(['POST'])
def add_to_cart(request):
    try:
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        cart = get_cart(request)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'})

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if created:
            cart_item.quantity = quantity
        else:
            cart_item.quantity += quantity

        cart_item.save()

        return Response({'message': 'Item added to cart'})

    except Exception as e:
        return Response({'error': str(e)})


# VIEW CART
@api_view(['GET'])
def view_cart(request):
    try:
        cart = get_cart(request)
        items = CartItem.objects.filter(cart=cart)

        cart_data = []
        total = 0

        for item in items:
            subtotal = item.product.price * item.quantity
            total += subtotal

            # Get product images safely
            image_list = []
            images = ProductImage.objects.filter(product=item.product)

            for img in images:
                if img.image:
                    try:
                        image_list.append({
                            "image_url": img.image.url
                        })
                    except:
                        image_list.append({
                            "image_url": ""
                        })

            cart_data.append({
                'id': item.id,
                'product': {
                    'id': item.product.id,
                    'name': item.product.name,
                    'price': item.product.price,
                    'images': image_list
                },
                'quantity': item.quantity,
                'subtotal': subtotal
            })

        return Response({
            'cart': cart_data,
            'total': total
        })

    except Exception as e:
        return Response({'error': str(e)})


# UPDATE CART
@api_view(['POST'])
def update_cart(request):
    try:
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity'))

        cart = get_cart(request)
        product = Product.objects.get(id=product_id)
        cart_item = CartItem.objects.get(cart=cart, product=product)

        if quantity <= 0:
            cart_item.delete()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        return Response({'message': 'Cart updated'})

    except Exception as e:
        return Response({'error': str(e)})


# REMOVE FROM CART
@api_view(['POST'])
def remove_from_cart(request):
    try:
        product_id = request.data.get('product_id')
        cart = get_cart(request)

        cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
        cart_item.delete()

        return Response({'message': 'Item removed'})

    except Exception as e:
        return Response({'error': str(e)})