import { useState } from "preact/hooks";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { searchCard, type SearchCardResponse } from "../actions/searchCard";

export function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<SearchCardResponse | null>(null);

  async function handleSearch(e: Event) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setCard(null);

    try {
      const result = await searchCard(trimmed);
      setCard(result);
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack gap={8} maxW="2xl" mx="auto" mt={8}>
      <Heading size="xl" textAlign="center">
        Card Search
      </Heading>

      {/* Search form */}
      <Flex as="form" gap={3} onSubmit={handleSearch}>
        <Input
          flex="1"
          placeholder="Enter a card name…"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
          disabled={loading}
          size="lg"
        />
        <Button
          type="submit"
          colorPalette="blue"
          size="lg"
          loading={loading}
          disabled={loading || !query.trim()}
        >
          Search
        </Button>
      </Flex>

      {/* Loading */}
      {loading && (
        <Flex justify="center" py={6}>
          <Spinner size="xl" />
        </Flex>
      )}

      {/* Error */}
      {error && (
        <Box p={4} bg="red.subtle" borderRadius="md" color="red.fg">
          <Text fontWeight="semibold">Error</Text>
          <Text fontSize="sm" mt={1}>{error}</Text>
        </Box>
      )}

      {/* Card result */}
      {card && (
        <Flex
          gap={6}
          p={5}
          bg="bg.panel"
          borderRadius="xl"
          boxShadow="md"
          flexDir={{ base: "column", sm: "row" }}
        >
          {card.imageUri && (
            <Image
              src={card.imageUri}
              alt={card.name}
              borderRadius="lg"
              w={{ base: "100%", sm: "200px" }}
              flexShrink={0}
              objectFit="contain"
            />
          )}
          <Stack gap={2} flex="1" justify="center">
            <Flex align="baseline" gap={3} flexWrap="wrap">
              <Heading size="md">{card.name}</Heading>
              {card.manaCost && (
                <Text fontSize="sm" color="fg.muted" fontFamily="mono">
                  {card.manaCost}
                </Text>
              )}
            </Flex>
            {card.typeLine && (
              <Text fontSize="sm" color="fg.subtle" fontStyle="italic">
                {card.typeLine}
              </Text>
            )}
            {card.oracleText && (
              <Text
                fontSize="sm"
                mt={2}
                whiteSpace="pre-line"
                borderTop="1px solid"
                borderColor="border.subtle"
                pt={2}
              >
                {card.oracleText}
              </Text>
            )}
          </Stack>
        </Flex>
      )}
    </Stack>
  );
}
