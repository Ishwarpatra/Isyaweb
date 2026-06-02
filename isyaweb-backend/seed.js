const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool, query } = require('./db');

async function seed() {
  console.log('// STARTING_DATABASE_SEEDING...');
  
  try {
    // 1. Read and run schema.sql to clear and build tables
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await query(schemaSql);
    console.log('✓ Tables dropped, recreated and indexed.');

    // 2. Hash passwords
    const adminHash = await bcrypt.hash('admin123', 12);
    const cadetHash = await bcrypt.hash('password123', 12);
    const modHash = await bcrypt.hash('moderator123', 12);
    const mentorHash = await bcrypt.hash('mentor123', 12);
    
    // 3. Insert Users
    console.log('Inserting default users...');
    const usersResult = await query(`
      INSERT INTO users (email, password_hash, name, role) VALUES 
      ('admin@isya.space', $1, 'Commander Admin', 'admin'),
      ('cadet@isya.space', $2, 'Cadet Chen', 'user'),
      ('moderator@isya.space', $3, 'Officer Mod', 'moderator'),
      ('mentor@isya.space', $4, 'Instructor Mentor', 'mentor'),
      ('david@isya.space', $2, 'David Osei', 'mentor'),
      ('sarah@isya.space', $2, 'Sarah Chen', 'mentor'),
      ('yuki@isya.space', $2, 'Yuki Tanaka', 'mentor')
      RETURNING id, email, name;
    `, [adminHash, cadetHash, modHash, mentorHash]);
    
    const usersMap = {};
    usersResult.rows.forEach(u => {
      usersMap[u.email] = u.id;
    });
    console.log('✓ Users inserted successfully:', Object.keys(usersMap));

    // 4. Insert Blog Posts
    console.log('Inserting default blog posts...');
    const blog1 = await query(`
      INSERT INTO blog_posts (title, slug, content, excerpt, author_id, category, featured, image, published_at) VALUES (
        'ISYA Members Join ESA''s Young Graduate Traineeship Program',
        'isya-members-join-esa-ygt',
        'Fifteen cadets from the International Space Youth Association (ISYA) have officially been selected to join the European Space Agency''s (ESA) Young Graduate Traineeship (YGT) program. This prestigious initiative offers high-caliber university graduates a unique, hands-on experience in space science and engineering.\n\nThe trainees will be stationed across key European Space Research and Technology Centre (ESTEC) facilities in the Netherlands, Darmstadt, and Frascati. Their research will span a diverse collection of projects, including CubeSat communications networks, orbital decay simulation models, and next-generation spectral imaging technologies.\n\nThis announcement represents a significant milestone in ISYA''s mission to bridge the gap between academic space enthusiast clubs and professional space operations agencies. Congratulations to all selected trainees! Their hard work in near-space telemetry during our annual workshops has prepared them to make a tangible contribution to the global scientific community.',
        'Fifteen ISYA cadets have been selected for ESA''s prestigious traineeship, gaining hands-on experience at facilities across Europe.',
        $1,
        'MISSION_UPDATE',
        TRUE,
        'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
        '2026-05-14 10:00:00'
      ) RETURNING id;
    `, [usersMap['cadet@isya.space']]);

    const blog2 = await query(`
      INSERT INTO blog_posts (title, slug, content, excerpt, author_id, category, featured, image, published_at) VALUES (
        'Exoplanet Discovery Methods: A Youth Astronomer''s Complete Guide',
        'exoplanet-discovery-methods',
        'How do we detect alien worlds orbiting stars trillions of miles away? While exoplanets are too distant to be resolved directly by standard telescopes, astronomers use several indirect observation techniques to discover thousands of planetary bodies.\n\nThe most successful detection method to date is Transit Photometry. By measuring the dimming of a star as a planet crosses in front of its disk, telescopes like Kepler and TESS can estimate a planet''s size, orbital period, and distance from its host star.\n\nAnother fundamental method is Radial Velocity, which measures small wobbles in a star''s spectral signatures caused by the gravitational pull of an orbiting exoplanet. By combining transit and radial velocity datasets, astrophysicists can calculate both the mass and radius of the planet, revealing its density and chemical composition.',
        'How do we detect alien worlds orbiting stars trillions of miles away? Explore transit photometry and radial velocity methods.',
        $1,
        'RESEARCH',
        FALSE,
        'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800',
        '2026-05-10 14:30:00'
      ) RETURNING id;
    `, [usersMap['david@isya.space']]);

    const blog3 = await query(`
      INSERT INTO blog_posts (title, slug, content, excerpt, author_id, category, featured, image, published_at) VALUES (
        'Annual Space Symposium 2026 — Registration Now Open',
        'annual-space-symposium-2026',
        'We are thrilled to announce that registration is officially open for the Annual ISYA Space Symposium 2026, set to take place in Nairobi, Kenya, from August 12th to August 16th. The event will bring together over 500 young space advocates, researchers, and professional astronauts.\n\nThis year''s theme, ''Decentralizing the Cosmos,'' focuses on empowering global South space starts and student-led CubeSat operations. Keynote speakers include flight directors from major international agencies, astrobiology researchers, and CubeSat mission managers.\n\nPriority registration closes on June 30th. Funding grants are available to cover travel expenses for cadets presenting research papers. Submit your abstracts via our mission portal as soon as possible!',
        'Join 500+ young scientists in Nairobi for the ISYA Annual Symposium. Apply before June 30 for priority access.',
        $1,
        'EVENT',
        FALSE,
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        '2026-05-06 09:15:00'
      ) RETURNING id;
    `, [usersMap['admin@isya.space']]);
    console.log('✓ Blog posts seeded.');

    // 5. Insert Comments
    console.log('Inserting default comments...');
    await query(`
      INSERT INTO comments (post_id, author_id, content, created_at) VALUES 
      ($1, $2, 'This is a huge opportunity! Congrats to everyone selected for YGT. See you all in ESTEC!', NOW() - INTERVAL '3 days'),
      ($1, $3, 'Excellent write-up! I''ve been testing the budget radio receivers for solar cycle updates, very relevant.', NOW() - INTERVAL '2 days');
    `, [blog1.rows[0].id, usersMap['sarah@isya.space'], usersMap['yuki@isya.space']]);
    console.log('✓ Comments seeded.');

    console.log('// DATABASE_SEEDED_SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ SEEDING_ERROR:', err);
  } finally {
    await pool.end();
  }
}

seed();
