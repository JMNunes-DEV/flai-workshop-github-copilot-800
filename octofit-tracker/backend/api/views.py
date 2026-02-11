from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer


@api_view(['GET'])
def api_root(request, format=None):
    """
    API root endpoint providing links to all available endpoints.
    """
    base_url = request.build_absolute_uri('/api/')
    return Response({
        'message': 'Welcome to OctoFit Tracker API',
        'endpoints': {
            'users': base_url + 'users/',
            'teams': base_url + 'teams/',
            'activities': base_url + 'activities/',
            'leaderboard': base_url + 'leaderboard/',
            'workouts': base_url + 'workouts/',
        }
    })


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing teams.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activities.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and managing leaderboard.
    """
    queryset = Leaderboard.objects.all().order_by('rank')
    serializer_class = LeaderboardSerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing workout suggestions.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
