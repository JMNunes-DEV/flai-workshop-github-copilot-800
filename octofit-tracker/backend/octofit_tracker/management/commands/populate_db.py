from django.core.management.base import BaseCommand
from api.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete all existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Avengers assemble! The mightiest heroes of Earth united for fitness domination.'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League united! Protecting wellness and crushing fitness goals.'
        )
        
        self.stdout.write(self.style.SUCCESS(f'Created teams: {team_marvel.name}, {team_dc.name}'))
        
        # Create Marvel Users
        self.stdout.write('Creating Marvel heroes...')
        marvel_heroes = [
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'password': 'arc_reactor_3000'},
            {'name': 'Steve Rogers', 'email': 'captain@marvel.com', 'password': 'shield_throw_1942'},
            {'name': 'Thor Odinson', 'email': 'thor@asgard.com', 'password': 'mjolnir_worthy'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@shield.com', 'password': 'red_ledger'},
            {'name': 'Bruce Banner', 'email': 'hulk@marvel.com', 'password': 'gamma_smash'},
            {'name': 'Peter Parker', 'email': 'spiderman@marvel.com', 'password': 'web_slinger'},
        ]
        
        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_marvel.id)
            )
            marvel_users.append(user)
            self.stdout.write(f'  Created: {user.name}')
        
        # Create DC Users
        self.stdout.write('Creating DC heroes...')
        dc_heroes = [
            {'name': 'Bruce Wayne', 'email': 'batman@wayneenterprises.com', 'password': 'dark_knight'},
            {'name': 'Clark Kent', 'email': 'superman@dailyplanet.com', 'password': 'kryptonite_free'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@themyscira.com', 'password': 'lasso_truth'},
            {'name': 'Barry Allen', 'email': 'flash@ccpd.com', 'password': 'speed_force'},
            {'name': 'Arthur Curry', 'email': 'aquaman@atlantis.com', 'password': 'ocean_master'},
            {'name': 'Hal Jordan', 'email': 'greenlantern@oa.com', 'password': 'willpower_ring'},
        ]
        
        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                password=hero['password'],
                team_id=str(team_dc.id)
            )
            dc_users.append(user)
            self.stdout.write(f'  Created: {user.name}')
        
        # Create Activities
        self.stdout.write('Creating activities...')
        all_users = marvel_users + dc_users
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weight Training', 'Yoga', 'Boxing', 'HIIT']
        
        activities_count = 0
        for user in all_users:
            # Each user gets 5-10 random activities
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)
                distance = round(random.uniform(2.0, 15.0), 2) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                calories = duration * random.randint(5, 15)
                date = datetime.now() - timedelta(days=random.randint(0, 30))
                
                Activity.objects.create(
                    user_id=str(user.id),
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=date
                )
                activities_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Created {activities_count} activities'))
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in all_users:
            user_activities = Activity.objects.filter(user_id=str(user.id))
            total_activities = user_activities.count()
            total_duration = sum([a.duration for a in user_activities])
            total_points = sum([a.calories for a in user_activities])
            
            team_name = 'Team Marvel' if user.team_id == str(team_marvel.id) else 'Team DC'
            
            Leaderboard.objects.create(
                user_id=str(user.id),
                user_name=user.name,
                team_id=user.team_id,
                team_name=team_name,
                total_points=total_points,
                total_activities=total_activities,
                total_duration=total_duration
            )
        
        # Update ranks based on total_points
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_points')
        for rank, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = rank
            entry.save()
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} leaderboard entries'))
        
        # Create Workouts
        self.stdout.write('Creating workout suggestions...')
        workouts = [
            {
                'name': 'Superhero Strength Training',
                'description': 'Build strength like Thor! Focus on compound movements to increase overall power.',
                'difficulty': 'advanced',
                'duration': 60,
                'workout_type': 'Strength',
                'target_muscles': ['chest', 'back', 'legs', 'shoulders']
            },
            {
                'name': 'Speed Force Cardio',
                'description': 'Run like The Flash with this high-intensity interval training session.',
                'difficulty': 'intermediate',
                'duration': 30,
                'workout_type': 'Cardio',
                'target_muscles': ['legs', 'core', 'cardiovascular']
            },
            {
                'name': 'Avenger Core Blast',
                'description': 'Core stability workout inspired by Black Widow\'s agility training.',
                'difficulty': 'beginner',
                'duration': 20,
                'workout_type': 'Core',
                'target_muscles': ['abs', 'obliques', 'lower back']
            },
            {
                'name': 'Amazon Warrior Workout',
                'description': 'Train like Wonder Woman with this full-body functional fitness routine.',
                'difficulty': 'intermediate',
                'duration': 45,
                'workout_type': 'Functional',
                'target_muscles': ['full body', 'core', 'legs']
            },
            {
                'name': 'Atlantean Swimming Program',
                'description': 'Aquaman-approved swimming workout to build endurance and strength.',
                'difficulty': 'beginner',
                'duration': 40,
                'workout_type': 'Swimming',
                'target_muscles': ['shoulders', 'back', 'arms', 'legs']
            },
            {
                'name': 'Dark Knight Combat Training',
                'description': 'Batman\'s martial arts inspired workout combining strength and agility.',
                'difficulty': 'advanced',
                'duration': 75,
                'workout_type': 'Martial Arts',
                'target_muscles': ['full body', 'core', 'reflexes']
            },
        ]
        
        for workout_data in workouts:
            Workout.objects.create(**workout_data)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workout suggestions'))
        
        # Summary
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams: {Team.objects.count()}')
        self.stdout.write(f'Users: {User.objects.count()}')
        self.stdout.write(f'Activities: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard Entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts: {Workout.objects.count()}')
        self.stdout.write(self.style.SUCCESS('==================================='))
