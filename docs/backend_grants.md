# NeQu Grants 🗝

The permissions system in NeQu is done by grants, they
are divided by user specific grants and entity grants.

## User specific grants 👨‍💼
These kind of grants are useful for things that are system
wide, like being an admin or being able to see all the items
of a kind of entity.

The **admin** grant is the most powerful grant, it practically 
allows the user that has it to perform any action, by default
a randomly generated admin is created when migrations are first
ran, with this user the inital batch of users can be created.

## Entity grants
Entities may have different conditions to restric which users can
do something on them, these are where entity grants are used.

