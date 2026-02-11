"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

API Endpoints:
The API is accessible via the following URL formats:
- Local development: http://localhost:8000/api/
- GitHub Codespaces: https://${CODESPACE_NAME}-8000.app.github.dev/api/
  where ${CODESPACE_NAME} is automatically set in the Codespace environment
"""
from django.contrib import admin
from django.urls import path, include
from api.views import api_root
import os

# Codespace URL configuration
CODESPACE_NAME = os.getenv('CODESPACE_NAME')
if CODESPACE_NAME:
    # API accessible at: https://{CODESPACE_NAME}-8000.app.github.dev/api/
    BASE_API_URL = f'https://{CODESPACE_NAME}-8000.app.github.dev/api/'
else:
    # Local development URL
    BASE_API_URL = 'http://localhost:8000/api/'

urlpatterns = [
    path('', api_root, name='api-root'),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
]
