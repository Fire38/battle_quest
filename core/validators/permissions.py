from core.models import Captain


def is_captain(user):
    if Captain.objects.filter(user=user).exists():
        return True
    else:
        return False
