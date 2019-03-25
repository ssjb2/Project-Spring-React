package gb.repositories;


import gb.domain.Groups;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupsRepository extends CrudRepository<Groups, Long> {

    Groups findByGroupIdentifier(String groupId);

    @Override
    Iterable<Groups> findAll();
}
