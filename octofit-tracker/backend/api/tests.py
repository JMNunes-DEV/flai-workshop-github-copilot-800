from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from datetime import datetime
from .models import User, Team, Activity, Leaderboard, Workout


class TeamModelTestCase(TestCase):
    """Test cases for Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team for testing'
        )
    
    def test_team_creation(self):
        """Test that a team can be created"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.description, 'A test team for testing')
    
    def test_team_str(self):
        """Test the string representation of a team"""
        self.assertEqual(str(self.team), 'Test Team')


class UserModelTestCase(TestCase):
    """Test cases for User model"""
    
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='testpass123',
            team_id=str(self.team.id)
        )
    
    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team_id, str(self.team.id))
    
    def test_user_str(self):
        """Test the string representation of a user"""
        self.assertEqual(str(self.user), 'Test User')


class ActivityModelTestCase(TestCase):
    """Test cases for Activity model"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='testpass123'
        )
        self.activity = Activity.objects.create(
            user_id=str(self.user.id),
            activity_type='Running',
            duration=30,
            distance=5.0,
            calories=300,
            date=datetime.now()
        )
    
    def test_activity_creation(self):
        """Test that an activity can be created"""
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.distance, 5.0)
        self.assertEqual(self.activity.calories, 300)


class WorkoutModelTestCase(TestCase):
    """Test cases for Workout model"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            difficulty='intermediate',
            duration=45,
            workout_type='Strength',
            target_muscles=['chest', 'arms']
        )
    
    def test_workout_creation(self):
        """Test that a workout can be created"""
        self.assertEqual(self.workout.name, 'Test Workout')
        self.assertEqual(self.workout.difficulty, 'intermediate')
        self.assertEqual(self.workout.duration, 45)


class APITestCase(APITestCase):
    """Test cases for API endpoints"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='Test description'
        )
        self.user = User.objects.create(
            name='Test User',
            email='test@example.com',
            password='testpass123',
            team_id=str(self.team.id)
        )
    
    def test_api_root(self):
        """Test that the API root endpoint returns expected links"""
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
    
    def test_team_list(self):
        """Test retrieving the list of teams"""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_user_list(self):
        """Test retrieving the list of users"""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_team(self):
        """Test creating a new team via API"""
        url = reverse('team-list')
        data = {
            'name': 'New Team',
            'description': 'A new test team'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 2)
        self.assertEqual(response.data['name'], 'New Team')
    
    def test_create_user(self):
        """Test creating a new user via API"""
        url = reverse('user-list')
        data = {
            'name': 'New User',
            'email': 'newuser@example.com',
            'password': 'newpass123',
            'team_id': str(self.team.id)
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)
