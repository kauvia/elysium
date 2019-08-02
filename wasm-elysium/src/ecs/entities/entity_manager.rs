use crate::ecs::entities::entity::Entity;

use rand::Rng;

pub struct EntityManager {
    pub entities: Vec<Entity>,
}

impl EntityManager {

    pub fn entities_ptr(&self) -> *const Entity {
        self.entities.as_ptr()
    }

    pub fn new( entity_count:u16) -> EntityManager {

    let entities = (0..entity_count)
        .map(|x| {
            EntityManager::create_entity()
        })
        .collect();

    EntityManager {
        entities,
        }
    }

    fn create_entity()->Entity{
       
    let mut rng = rand::thread_rng();

    let pos_x=rng.gen_range(50,750);
    let pos_y=rng.gen_range(50,550);
    let vel_x=rng.gen_range(0,8)-4;
    let vel_y=rng.gen_range(0,8)-4;
    let angle=0;
    let img=0;

    Entity{
        pos_x,
        pos_y,
        vel_x,
        vel_y,
        angle,
        img,
        }
    
    }
}