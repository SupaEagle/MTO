import {
    CoreIdentityAgent,
    AudienceAgent,
    VoiceAgent,
    CompetitorAgent,
    ContentAgent,
    StrategyAgent
} from '../agents/modules';
import { db } from '../lib/db';

export async function runSixAgentPipeline(subAccountId: string, inputs: any) {
    console.log(`🚀 Starting Hexagon Protocol (V2.1) for ${subAccountId}...`);

    // 1. Initialize Agents
    const agents = {
        core: new CoreIdentityAgent(),
        audience: new AudienceAgent(),
        voice: new VoiceAgent(),
        competitor: new CompetitorAgent(),
        content: new ContentAgent(),
        strategy: new StrategyAgent(),
    };

    // 2. Run in Parallel (The "Flash" Advantage)
    // We use Promise.allSettled so if one fails, the others still save.
    const results = await Promise.allSettled([
        agents.core.execute(inputs),
        agents.audience.execute(inputs),
        agents.voice.execute(inputs),
        agents.competitor.execute(inputs),
        agents.content.execute(inputs),
        agents.strategy.execute(inputs),
    ]);

    // 3. Extract Data (Helper function to get result or empty object)
    const getResult = (index: number) =>
        results[index].status === 'fulfilled' ? (results[index] as any).value : {};

    const finalData = {
        core: getResult(0),
        audience: getResult(1),
        voice: getResult(2),
        competitors: getResult(3),
        content: getResult(4),
        strategy: getResult(5),
    };

    console.log("💾 Saving Hexagon DNA to Database (Mapping to 9-Column Schema)...");

    // 4. Save to Database
    // Agent 1 (Core) contains sub-objects that match our specialized columns
    const core = finalData.core;

    await db.query(`
    UPDATE brand_dna SET
      identity_data = $1,
      visual_identity = $2,
      brand_core = $3,
      narrative = $4,
      audience_definition = $5,
      competitor_recon = $6,
      voice_calibration = $7,
      content_strategy = $8,
      strategic_differentiation = $9,
      last_updated_at = NOW()
    WHERE sub_account_id = $10
  `, [
        JSON.stringify({
            company_name: core.company_name,
            website_url: core.website_url,
            industry_niche: core.industry_niche,
            physical_address: core.physical_address
        }), // identity_data
        JSON.stringify(core.visual_identity), // visual_identity
        JSON.stringify(core.brand_core), // brand_core
        JSON.stringify(core.narrative), // narrative
        JSON.stringify(finalData.audience), // audience_definition
        JSON.stringify(finalData.competitors), // competitor_recon
        JSON.stringify(finalData.voice), // voice_calibration
        JSON.stringify(finalData.content), // content_strategy
        JSON.stringify(finalData.strategy), // strategic_differentiation
        subAccountId
    ]);

    console.log("✅ DNA Generated Successfully via Hexagon Protocol");
    return { success: true, dna: finalData };
}
