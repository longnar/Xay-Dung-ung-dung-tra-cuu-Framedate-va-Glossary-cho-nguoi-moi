-- Add indexes used by character detail and glossary queries.
USE idol_showdown_wiki;

CREATE INDEX idx_character_moves_character_id
    ON character_moves(character_id);

CREATE INDEX idx_glossaries_level
    ON glossaries(level);
