def get_master_key_and_master_user(current_user):
    if current_user.groups.filter(name='master_user').exists():
        key = current_user.apikey
        return key, current_user
    elif current_user.groups.filter(name='slave_user').exists():
        key = current_user.finegrainapikey.master_key
        return key, key.user
    else:
        return False