
export const checkPermission =  (required_slug:string, permissions:any) => {

  const matched = permissions.filter((permission:any) => {
    return permission.resource_slug == required_slug;
  })

  if (matched.length > 0) {
    return true;
  }
  else{
    false;
  }
}