
import { ButtonGroup, IconButton, Stack, Text, } from "@chakra-ui/react"
import { Pagination } from "@ark-ui/react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { useState } from "react"

// Componente para el cambio de paguinas
const pageSize = 5
const count = 50
const items = new Array(count).fill(0).map((_, index) => `Elemento ${index + 1}`)

const Demo = () => {
  const [page, setPage] = useState(1)

  const startRange = (page - 1) * pageSize
  const endRange = startRange + pageSize
  const visibleItems = items.slice(startRange, endRange)

  return (
    <Stack gap="4">
      <Stack>
        {visibleItems.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Stack>

      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => setPage(e.page)}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Página anterior" icon={<HiChevronLeft />} />
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={({ page: p, isSelected }) => (
              <Pagination.Item key={p} asChild>
                <IconButton
                  aria-label={`Página ${p}`}
                  variant={isSelected ? "solid" : "ghost"}
                  isActive={isSelected}
                >
                  {p}
                </IconButton>
              </Pagination.Item>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Página siguiente" icon={<HiChevronRight />} />
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  )
}

export default Demo