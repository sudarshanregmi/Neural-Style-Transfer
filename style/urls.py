from django.urls import path
from . import views
from style.views import IndexView

urlpatterns = [
    path('', IndexView.as_view(), name="style-home"),
]
