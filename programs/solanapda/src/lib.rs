use anchor_lang::prelude::*;

declare_id!("5WddyjSv7XASHfsgG14Wk5h39YVxWuKrnEHK9p2B8Whc");

#[program]
pub mod solanapda {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
