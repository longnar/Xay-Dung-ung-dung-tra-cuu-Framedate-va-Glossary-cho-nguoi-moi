-- Add indexes used by character detail and glossary queries.

CREATE INDEX idx_character_moves_character_id
    ON character_moves(character_id);

CREATE INDEX idx_glossaries_level
    ON glossaries(level);
