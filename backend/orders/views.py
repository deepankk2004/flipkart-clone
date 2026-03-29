from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order, OrderItem
from cart.models import Cart, CartItem


@api_view(['POST'])
def place_order(request):
    session_id = request.session.session_key

    if not session_id:
        return Response({'error': 'No active session'})

    try:
        cart = Cart.objects.get(session_id=session_id)
    except Cart.DoesNotExist:
        return Response({'error': 'Cart not found'})

    items = CartItem.objects.filter(cart=cart)

    if not items:
        return Response({'error': 'Cart is empty'})

    total = 0
    for item in items:
        total += item.product.price * item.quantity

    order = Order.objects.create(
        session_id=session_id,
        total_amount=total,
        address=request.data.get('address'),
        status='Placed'
    )

    for item in items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    items.delete()  # Clear cart after order

    return Response({
        'message': 'Order placed successfully',
        'order_id': order.id,
        'total': total
    })