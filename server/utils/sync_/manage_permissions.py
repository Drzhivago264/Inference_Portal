def get_master_key_and_master_user(current_user):
    if current_user.groups.filter(name='master_user').exists():
        return current_user.apikey, current_user
    elif current_user.groups.filter(name='slave_user').exists():
        return current_user.finegrainapikey.master_key, current_user.finegrainapikey.master_key.user
    else:
        return False