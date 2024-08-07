from typing import Tuple, Union

from django.contrib.auth.models import User
from django.utils import timezone

from server.models.api_key import APIKEY


def get_master_key_and_master_user(
    current_user: User,
) -> Union[Tuple[APIKEY, User], Tuple[False, False]]:
    """
    This function checks the group membership of a given current_user and returns either the user's API key and user object
    or the master key and master user object, depending on the group. If the user is not in either group, it returns False.

    Args:
        current_user (User): The user for which to retrieve the master key and master user.

    Returns:
        Union[Tuple[str, User], bool]: A tuple containing a string (API key) and a User object if the user is in the "master_user" group,
        a tuple containing a string (master key) and a User object if the user is in the "slave_user" group, or False if the user is not in either group.
    """
    if current_user.groups.filter(name="master_user").exists():
        return current_user.apikey, current_user
    elif current_user.groups.filter(name="slave_user").exists():
        if (
            current_user.finegrainapikey.ttl + current_user.finegrainapikey.created_at
            > timezone.now()
            or current_user.finegrainapikey.ttl is None
        ):
            return (
                current_user.finegrainapikey.master_key,
                current_user.finegrainapikey.master_key.user,
            )
        else:
            return False, False
    else:
        return False, False
