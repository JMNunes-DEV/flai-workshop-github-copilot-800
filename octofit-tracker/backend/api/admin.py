from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'email', 'team_id', 'created_at']
    list_filter = ['team_id', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['id']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['id']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'activity_type', 'duration', 'calories', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user_id', 'activity_type']
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'user_name', 'team_name', 'total_points', 'total_activities', 'total_duration']
    list_filter = ['team_name']
    search_fields = ['user_name', 'team_name']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'difficulty', 'duration', 'workout_type']
    list_filter = ['difficulty', 'workout_type']
    search_fields = ['name', 'description']
    ordering = ['id']
