from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_to_cart),
    path('', views.view_cart),
    path('update/', views.update_cart),
    path('remove/', views.remove_from_cart),
]