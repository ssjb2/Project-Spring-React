package gb.repositories;

import gb.domain.Backlog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long> {
    Backlog findByGroupIdentifier(String identifier);
}
